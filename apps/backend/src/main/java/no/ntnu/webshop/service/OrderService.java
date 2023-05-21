package no.ntnu.webshop.service;

import java.util.Optional;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.order.OrderDetails;
import no.ntnu.webshop.contracts.order.PlaceOrderRequest;
import no.ntnu.webshop.error.model.OrderNotFoundException;
import no.ntnu.webshop.error.model.ProductNotFoundException;
import no.ntnu.webshop.event.model.OrderConfirmationEvent;
import no.ntnu.webshop.model.Address;
import no.ntnu.webshop.model.Order;
import no.ntnu.webshop.model.OrderLine;
import no.ntnu.webshop.model.PaymentMethod;
import no.ntnu.webshop.model.ShippingMethod;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.repository.OrderJdbcRepository;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.repository.OrderLineJpaRepository;
import no.ntnu.webshop.repository.ProductPriceJpaRepository;

@Service
@RequiredArgsConstructor
public class OrderService {
  private final OrderJdbcRepository orderJdbcRepository;
  private final OrderJpaRepository orderJpaRepository;
  private final OrderLineJpaRepository orderLineJpaRepository;
  private final ProductPriceJpaRepository productPriceJpaRepository;
  private final ApplicationEventPublisher eventPublisher;

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
   * Places an order for the given customer.
   * 
   * @param request  the request to place an order
   * @param customer the customer placing the order, or the customer it should be placed for
   * 
   * @return the order that was placed
   */
  public OrderDetails placeOrder(
      PlaceOrderRequest request,
      UserAccount customer
  ) {
    var deliveryAddress = new Address(
      request.shippingAddress().country(),
      request.shippingAddress().postalCode(),
      request.shippingAddress().city(),
      request.shippingAddress().street(),
      request.shippingAddress().careOf()
    );

    // copy address unless it's different
    var billingAddress = !request.differentBillingAddress() ? Address.copyOf(deliveryAddress)
        : new Address(
          request.billingAddress().country(),
          request.billingAddress().postalCode(),
          request.billingAddress().city(),
          request.billingAddress().street(),
          request.billingAddress().careOf()
        );

    var order = new Order(
      customer,
      request.customerName(),
      deliveryAddress,
      billingAddress,
      PaymentMethod.fromString(request.paymentMethod()),
      ShippingMethod.fromString(request.shippingMethod())
    );

    var productIds = request.lines().keySet();

    var prices = this.productPriceJpaRepository.findAllCurrentPricesByProductIds(productIds);

    if (prices.size() != productIds.size())
      throw new ProductNotFoundException("Cannot place an order with non-active or non-existant products");

    for (var price : prices) {
      var product = price.getProduct();

      var line = new OrderLine(
        order,
        product,
        price,
        request.lines().get(product.getId())
      );

      order.addOrderLine(line);
    }

    var savedOrder = this.orderJpaRepository.save(order);

    this.eventPublisher.publishEvent(
      new OrderConfirmationEvent(
        customer,
        savedOrder.getId()
      )
    );

    return this.findById(savedOrder.getId());
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
