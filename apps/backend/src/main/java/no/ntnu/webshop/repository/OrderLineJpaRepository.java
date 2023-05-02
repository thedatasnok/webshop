package no.ntnu.webshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import no.ntnu.webshop.model.Order;
import no.ntnu.webshop.model.OrderLine;

public interface OrderLineJpaRepository extends JpaRepository<OrderLine, Long> {

  /**
   * Deletes all order lines by its parent order.
   * 
   * @param order the order to delete all order lines by
   */
  @Transactional
  void deleteAllByOrder(
      Order order
  );

}
