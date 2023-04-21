package no.ntnu.webshop.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.contracts.order.OrderSummary;
import no.ntnu.webshop.model.Order;

public interface OrderJpaRepository extends JpaRepository<Order, Long> {

  /**
   * Finds a daily order summary since a given date.
   * 
   * @param since the date to start from
   * 
   * @return a list of daily order summaries, since the given date
   * 
   * @deprecated the version in {@link OrderJdbcRepository} replaces this
   */
  @Deprecated
  @Query("""
      SELECT new no.ntnu.webshop.contracts.order.OrderSummary(
        EXTRACT(date FROM o.orderedAt),
        COUNT(DISTINCT o.id),
        SUM(ol.subtotal)
      )
      FROM Order o
      JOIN o.lines ol
      WHERE o.orderedAt >= :since
      GROUP BY EXTRACT(date FROM o.orderedAt)
    """)
  List<OrderSummary> findDailyOrderSummary(
      @Param("since") Date since
  );

}
