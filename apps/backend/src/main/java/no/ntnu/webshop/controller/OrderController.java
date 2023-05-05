package no.ntnu.webshop.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
import no.ntnu.webshop.service.OrderService;

/**
 * Controller responsible for endpoints that are related to orders. This does not include placing
 * orders or manipulating them on behalf of a customer.
 * 
 * @see UserContextOrderController The UserContextOrderController that handles orders on behalf of
 *      the authenticated customer
 */
@Tag(name = "Orders")
@RestController
@ShopWorkerAuthorization
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {
  private final OrderJdbcRepository orderJdbcRepository;
  private final OrderJpaRepository orderJpaRepository;
  private final OrderService orderService;

  @Operation(summary = "Finds a summary of orders grouped by day")
  @GetMapping("/summary")
  public ResponseEntity<List<OrderSummary>> findDailyOrderSummary(
      @Parameter(description = "The date to start the summary from, defaults to 7 days ago.") @RequestParam("since")
      @DateTimeFormat(iso = ISO.DATE) Optional<Date> since
  ) {
    var sinceDate = since.orElse(Date.from(Instant.now().minus(7, ChronoUnit.DAYS)));

    return ResponseEntity.ok(this.orderJdbcRepository.findDailyOrderSummary(sinceDate));
  }

  @Operation(summary = "Lists all orders")
  @GetMapping
  public ResponseEntity<List<OrderDetails>> findOrders() {
    return ResponseEntity.ok(this.orderJdbcRepository.findOrders(Optional.empty(), Optional.empty(), Optional.empty()));
  }

  @Operation(summary = "Updates an orders statuses")
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

    return ResponseEntity.ok(this.orderService.findById(orderId));
  }

}
