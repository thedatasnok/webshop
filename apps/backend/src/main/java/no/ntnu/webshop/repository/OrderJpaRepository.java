package no.ntnu.webshop.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.contracts.order.OrderListItem;
import no.ntnu.webshop.model.Order;

public interface OrderJpaRepository extends JpaRepository<Order, Long> {

  /**
   * Finds an order by its id and the customers id.
   * 
   * @param id         the id of the order to find
   * @param customerId the id of the customer that owns the order
   * 
   * @return an optional containing the order, if found
   */
  @Query("SELECT o FROM Order o WHERE o.id = :id AND o.customer.id = :customerId")
  Optional<Order> findByIdAndCustomer(
      @Param("id") Long id,
      @Param("customerId") UUID customerId
  );

  /**
   * Finds a list of orders, optionally filtered by the given date.
   * 
   * @param since the date to find order since
   * 
   * @return a list of orders
   */
  @Query("""
      SELECT NEW no.ntnu.webshop.contracts.order.OrderListItem(
        o.id,
        o.orderedAt,
        o.customerName,
        o.customerEmail,
        CAST(o.orderStatus AS STRING),
        CAST(o.paymentMethod AS STRING),
        CAST(o.paymentStatus AS STRING),
        SUM(ol.subtotal),
        COUNT(DISTINCT ol.id)
      ) FROM Order o
      LEFT JOIN o.lines ol
      WHERE o.orderedAt >= :since
      GROUP BY o.id
      ORDER BY o.orderedAt DESC
    """)
  List<OrderListItem> findRecentOrders(
      @Param("since") Date since
  );

}
