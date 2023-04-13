package no.ntnu.webshop.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.GenericResponse;
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
import no.ntnu.webshop.repository.OrderJdbcRepository;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.repository.ProductPriceJpaRepository;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;
import no.ntnu.webshop.security.annotation.CustomerAuthorization;

/**
 * Controller responsible for endpoints that regard orders for the currently loggged in user
 * account. This is split out from the {@link UserContextController} {@link OrderController} to as
 * an attempt to increase cohesiveness.
 */
@Tag(name = "User Context")
@RestController
@CustomerAuthorization
@RequiredArgsConstructor
@RequestMapping("/api/v1/me/orders")
public class UserContextOrderController {
  private final OrderJdbcRepository orderJdbcRepository;
  private final OrderJpaRepository orderJpaRepository;
  private final ProductPriceJpaRepository productPriceJpaRepository;
  private final ApplicationEventPublisher eventPublisher;

  @Operation(summary = "Lists all orders for the logged in user")
  @GetMapping
  public ResponseEntity<List<OrderDetails>> findOrders(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter,
      @RequestParam("productName") Optional<String> productName
  ) {
    var userId = adapter.getUserAccount().getId();
    return ResponseEntity.ok(this.orderJdbcRepository.findOrdersByUserId(userId, productName, Optional.empty()));
  }

  @Operation(summary = "Finds a specific order for the logged in user")
  @GetMapping("/{orderId}")
  public ResponseEntity<OrderDetails> findOrder(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter,
      @RequestParam("orderId") Long orderId
  ) {
    var userId = adapter.getUserAccount().getId();
    var results = this.orderJdbcRepository.findOrdersByUserId(userId, Optional.empty(), Optional.of(orderId));

    if (results.isEmpty())
      throw new OrderNotFoundException("Could not find an order with id: " + orderId);

    return ResponseEntity.ok(results.get(0));
  }

  @Operation(summary = "Places an order for the logged in user")
  @PostMapping
  @CustomerAuthorization
  public ResponseEntity<GenericResponse> placeOrder(
      @Valid @RequestBody PlaceOrderRequest orderRequest,
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter
  ) {
    var customer = adapter.getUserAccount();

    var deliveryAddress = new Address(
      orderRequest.shippingAddress().country(),
      orderRequest.shippingAddress().postalCode(),
      orderRequest.shippingAddress().city(),
      orderRequest.shippingAddress().street(),
      orderRequest.shippingAddress().careOf()
    );

    // copy address unless it's different
    var billingAddress = !orderRequest.differentBillingAddress() ? Address.copyOf(deliveryAddress)
        : new Address(
          orderRequest.billingAddress().country(),
          orderRequest.billingAddress().postalCode(),
          orderRequest.billingAddress().city(),
          orderRequest.billingAddress().street(),
          orderRequest.billingAddress().careOf()
        );

    var order = new Order(
      customer,
      deliveryAddress,
      billingAddress,
      PaymentMethod.fromString(orderRequest.paymentMethod()),
      ShippingMethod.fromString(orderRequest.shippingMethod())
    );

    var productIds = orderRequest.lines().keySet();

    var prices = this.productPriceJpaRepository.findAllCurrentPricesByProductIds(productIds);

    if (prices.size() != productIds.size())
      throw new ProductNotFoundException("Cannot place an order with non-active or non-existant products");

    for (var price : prices) {
      var product = price.getProduct();

      var line = new OrderLine(
        order,
        product,
        price,
        orderRequest.lines().get(product.getId())
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

    return ResponseEntity.created(URI.create("/api/v1/orders/" + savedOrder.getId()))
      .body(new GenericResponse("Order placed successfully"));
  }

}
