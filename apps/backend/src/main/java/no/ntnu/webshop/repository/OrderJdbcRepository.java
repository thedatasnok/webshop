package no.ntnu.webshop.repository;

import java.sql.Types;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.ntnu.webshop.contracts.address.AddressDto;
import no.ntnu.webshop.contracts.order.OrderDetails;
import no.ntnu.webshop.contracts.order.OrderLineDetails;
import no.ntnu.webshop.contracts.order.OrderSummary;
import no.ntnu.webshop.error.model.MappingException;

@Slf4j
@Repository
@RequiredArgsConstructor
public class OrderJdbcRepository {
  private final NamedParameterJdbcTemplate jdbcTemplate;
  private final ObjectMapper objectMapper;

  private static final TypeReference<List<OrderLineDetails>> ORDER_LINE_DETAILS_LIST_TYPE_REF = new TypeReference<>(){};

  /**
   * Finds a daily order summary since a given date.
   * 
   * @param since the date to start from
   * 
   * @return a list of daily order summaries, since the given date
   */
  public List<OrderSummary> findDailyOrderSummary(
      Date since
  ) {
    return this.jdbcTemplate.query(
      """
        SELECT
          DATE_TRUNC('day', date_series) AS date,
          COUNT(DISTINCT o.order_id) AS number_of_sales,
          SUM(ol.subtotal) AS sum_of_sales
        FROM
          GENERATE_SERIES(:since, NOW(), INTERVAL '1 day') AS date_series
        LEFT JOIN "order" o ON (DATE_TRUNC('day', o.ordered_at) = DATE_TRUNC('day', date_series))
        LEFT JOIN order_line ol ON (ol.fk_order_id = o.order_id)
        GROUP BY date
        ORDER BY date ASC
        """,
      Map.of("since", since),
      (rs, i) -> new OrderSummary(
        rs.getDate("date"),
        rs.getLong("number_of_sales"),
        rs.getDouble("sum_of_sales")
      )
    );
  }

  /**
   * Finds all orders for a user.
   * 
   * @param userId      the id of the user to find orders for
   * @param productName optional product name to filter by
   * @param orderId     optional order id to filter by
   * 
   * @return a list of orders for that user
   */
  public List<OrderDetails> findOrders(
      Optional<UUID> userId,
      Optional<String> productName,
      Optional<Long> orderId
  ) {
    var params = new MapSqlParameterSource();

    params.addValue("userId", userId.orElse(null), Types.VARCHAR);
    params.addValue("productName", productName.orElse(null), Types.VARCHAR);
    params.addValue("orderId", orderId.orElse(null), Types.BIGINT);

    // couldn't find a way to do this with JPQL/HQL
    // so we're using native SQL instead
    return this.jdbcTemplate.query("""
        SELECT
          o.order_id,
          o.customer_name,
          o.customer_email,
          o.ordered_at,
          o.order_status,
          o.payment_status,
          o.payment_method,
          o.shipping_method,
          -- Delivery address
          o.delivery_country,
          o.delivery_postal_code,
          o.delivery_city,
          o.delivery_street,
          o.delivery_care_of,
          -- Billing/invoice address
          o.invoice_country,
          o.invoice_postal_code,
          o.invoice_city,
          o.invoice_street,
          o.invoice_care_of,
          SUM(ol.subtotal) AS total,
          -- Order lines
          JSON_AGG(JSON_BUILD_OBJECT(
            'id', ol.order_line_id,
            'productId', p.product_id,
            'productName', p.name,
            'productShortDescription', p.short_description,
            'productImageUrls', p.image_urls,
            'quantity', ol.quantity,
            'wasDiscount', pp.is_discount,
            'previousUnitPrice', prev_pp.price,
            'unitPrice', pp.price,
            'subtotal', ol.subtotal
          )) AS lines
        FROM "order" o
        INNER JOIN order_line ol
          ON o.order_id = ol.fk_order_id
        INNER JOIN product p
          ON ol.fk_product_id = p.product_id
        INNER JOIN product_price pp
          ON ol.fk_product_price_id = pp.product_price_id
        LEFT JOIN product_price prev_pp
          ON prev_pp.fk_product_id = p.product_id
          AND prev_pp.time_to = pp.time_from
        WHERE
          (:userId IS NULL OR o.fk_customer_id = :userId::uuid) AND
          (o.order_id IN (
            SELECT DISTINCT ol.fk_order_id FROM order_line ol
            INNER JOIN product p ON ol.fk_product_id = p.product_id
            WHERE
              (:productName IS NULL OR p.name ILIKE '%' || :productName || '%') AND
              (:orderId IS NULL OR ol.fk_order_id = :orderId)
          ))
        GROUP BY o.order_id
        ORDER BY o.ordered_at DESC
      """, params, (rs, i) -> {
      try {
        return OrderDetails.builder()
          .id(rs.getLong("order_id"))
          .customerName(rs.getString("customer_name"))
          .customerEmail(rs.getString("customer_email"))
          .orderedAt(rs.getTimestamp("ordered_at"))
          .deliveryAddress(
            new AddressDto(
              rs.getString("delivery_country"),
              rs.getString("delivery_postal_code"),
              rs.getString("delivery_city"),
              rs.getString("delivery_street"),
              rs.getString("delivery_care_of")
            )
          )
          .billingAddress(
            new AddressDto(
              rs.getString("invoice_country"),
              rs.getString("invoice_postal_code"),
              rs.getString("invoice_city"),
              rs.getString("invoice_street"),
              rs.getString("invoice_care_of")
            )
          )
          .lines(this.objectMapper.readValue(rs.getString("lines"), ORDER_LINE_DETAILS_LIST_TYPE_REF))
          .total(rs.getDouble("total"))
          .status(rs.getString("order_status"))
          .paymentStatus(rs.getString("payment_status"))
          .paymentMethod(rs.getString("payment_method"))
          .shippingMethod(rs.getString("shipping_method"))
          .build();
      } catch (Exception e) {
        log.error("Failed to convert order to OrderDetails", e);
        throw new MappingException("Failed to convert order to OrderDetails");
      }
    });
  }

}
