package no.ntnu.webshop.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.order.OrderDetails;
import no.ntnu.webshop.error.model.OrderNotFoundException;
import no.ntnu.webshop.repository.OrderJdbcRepository;

@Service
@RequiredArgsConstructor
public class OrderService {
  private final OrderJdbcRepository orderJdbcRepository;

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

}
