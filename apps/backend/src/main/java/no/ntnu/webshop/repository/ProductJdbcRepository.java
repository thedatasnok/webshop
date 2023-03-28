package no.ntnu.webshop.repository;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.product.ProductDetails;
import no.ntnu.webshop.contracts.product.ProductItemDetails;
import no.ntnu.webshop.error.model.MappingException;

@Repository
@RequiredArgsConstructor
public class ProductJdbcRepository {
  private final NamedParameterJdbcTemplate jdbcTemplate;
  private final ObjectMapper objectMapper;

  private static final TypeReference<List<String>> STRING_LIST_TYPE_REF = new TypeReference<>(){};
  private static final TypeReference<List<ProductItemDetails>> PRODUCT_ITEM_DETAILS_LIST_TYPE_REF = new TypeReference<>(){};

  /**
   * Finds a product by its id, including its items and price.
   * 
   * @param id the id of the product to find
   * 
   * @return the product details
   */
  public ProductDetails findById(
      Long id
  ) {
    // couldn't find a way to do this with JPQL/HQL
    // so we're using native SQL instead
    return this.jdbcTemplate.queryForObject("""
      SELECT
        p.product_id,
        p.name,
        p.description,
        p.short_description,
        p.image_urls,
        pp.is_discount,
        pp.price,
        prev_pp.price AS previous_price,
        JSON_AGG(it) AS items
      FROM
        product p,
        -- find all items for the product
        (
          SELECT
            i.item_id AS id,
            pi.quantity,
            i.name,
            i.description,
            i.defined_attributes AS attributes
          FROM product_item pi
          INNER JOIN item i
          ON pi.fk_item_id = i.item_id
          WHERE pi.fk_product_id = :id
        ) it,
        product_price pp
      LEFT JOIN product_price prev_pp
        ON prev_pp.fk_product_id = :id
        AND prev_pp.time_to = pp.time_from
      WHERE
        (p.product_id = :id) AND
        (pp.fk_product_id = :id) AND
        (pp.time_from <= NOW()) AND
        (pp.time_to IS NULL)
      GROUP BY
        p.product_id,
        pp.product_price_id,
        prev_pp.product_price_id
      """, Map.of("id", id), (rs, rowNum) -> {
      try {
        return new ProductDetails(
          rs.getLong("product_id"),
          rs.getString("name"),
          rs.getString("short_description"),
          rs.getString("description"),
          this.objectMapper.readValue(rs.getString("image_urls"), STRING_LIST_TYPE_REF),
          rs.getDouble("price"),
          rs.getBoolean("is_discount"),
          rs.getDouble("previous_price"),
          this.objectMapper.readValue(rs.getString("items"), PRODUCT_ITEM_DETAILS_LIST_TYPE_REF)
        );
      } catch (Exception e) {
        throw new MappingException("Failed to convert product to ProductDetails");
      }
    });
  }

}
