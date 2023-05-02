package no.ntnu.webshop.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.order.OrderDetails;
import no.ntnu.webshop.error.model.OrderNotFoundException;
import no.ntnu.webshop.model.Order;
import no.ntnu.webshop.repository.OrderJdbcRepository;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.repository.OrderLineJpaRepository;

@Service
@RequiredArgsConstructor
public class OrderService {
  private final OrderJdbcRepository orderJdbcRepository;
  private final OrderJpaRepository orderJpaRepository;
  private final OrderLineJpaRepository orderLineJpaRepository;

  /**
   * Finds an order by its id independent of the customer.
   * 
   * @param id the id of the order to find
   * 
   * @return the order with the given id
   * 
   * @throws OrderNotFoundException if no order with the given id exists
   */
  public OrderDetails findById(
      Long id
  ) {
    var results = this.orderJdbcRepository.findOrders(Optional.empty(), Optional.empty(), Optional.of(id));

    if (results.isEmpty())
      throw new OrderNotFoundException("Could not find order with id: " + id);

    return results.get(0);
  }

  /**
   * Deletes an order from the system.
   * 
   * @param order the order to delete
   */
  public void deleteOrder(
      Order order
  ) {
    this.orderLineJpaRepository.deleteAllByOrder(order);
    this.orderJpaRepository.delete(order);
  }

}
