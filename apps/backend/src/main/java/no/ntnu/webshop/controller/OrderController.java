package no.ntnu.webshop.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.order.OrderDetails;
import no.ntnu.webshop.contracts.order.OrderSummary;
import no.ntnu.webshop.contracts.order.UpdateOrderRequest;
import no.ntnu.webshop.error.model.OrderNotFoundException;
import no.ntnu.webshop.model.OrderStatus;
import no.ntnu.webshop.model.PaymentStatus;
import no.ntnu.webshop.repository.OrderJdbcRepository;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;

@Tag(name = "Orders")
@RestController
@ShopWorkerAuthorization
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {
  private final OrderJdbcRepository orderJdbcRepository;
  private final OrderJpaRepository orderJpaRepository;

  @GetMapping("/summary")
  public ResponseEntity<List<OrderSummary>> findDailyOrderSummary(
      @RequestParam("since") Optional<Instant> since
  ) {
    var sinceInstant = since.orElse(Instant.now().minus(7, ChronoUnit.DAYS));

    return ResponseEntity.ok(this.orderJdbcRepository.findDailyOrderSummary(Date.from(sinceInstant)));
  }

  @GetMapping
  public ResponseEntity<List<OrderDetails>> findOrders() {
    return ResponseEntity
      .ok(this.orderJdbcRepository.findOrdersByUserId(Optional.empty(), Optional.empty(), Optional.empty()));
  }

  @PatchMapping("/{orderId}")
  public ResponseEntity<OrderDetails> updateOrder(
      @PathVariable Long orderId,
      @RequestBody UpdateOrderRequest request
  ) {
    var order = this.orderJpaRepository.findById(orderId)
      .orElseThrow(() -> new OrderNotFoundException("Could not find an order with id: " + orderId));

    order.setOrderStatus(OrderStatus.fromString(request.orderStatus()));
    order.setPaymentStatus(PaymentStatus.fromString(request.paymentStatus()));

    this.orderJpaRepository.save(order);

    var results = this.orderJdbcRepository.findOrdersByUserId(Optional.empty(), Optional.empty(), Optional.of(orderId));

    if (results.isEmpty())
      throw new OrderNotFoundException("Something went wrong fetching updated order");

    return ResponseEntity.ok(results.get(0));
  }

}
