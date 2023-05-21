package no.ntnu.webshop.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.order.OrderDetails;
import no.ntnu.webshop.contracts.order.PlaceOrderRequest;
import no.ntnu.webshop.error.model.OrderNotFoundException;
import no.ntnu.webshop.model.OrderStatus;
import no.ntnu.webshop.repository.OrderJdbcRepository;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;
import no.ntnu.webshop.security.annotation.CustomerAuthorization;
import no.ntnu.webshop.service.OrderService;

/**
 * Controller responsible for endpoints that do operations on orders for the currently loggged in
 * user account. This is split out from the {@link UserContextController} and
 * {@link OrderController} to attempt to increase cohesiveness.
 */
@Tag(name = "User Context")
@RestController
@CustomerAuthorization
@RequiredArgsConstructor
@RequestMapping("/api/v1/me/orders")
public class UserContextOrderController {
  private final OrderJdbcRepository orderJdbcRepository;
  private final OrderJpaRepository orderJpaRepository;
  private final OrderService orderService;

  @Operation(summary = "Lists all orders for the logged in user")
  @GetMapping
  public ResponseEntity<List<OrderDetails>> findOrders(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter,
      @Parameter(description = "The name of the product to find orders for, can be a case insensitive partial match")
      @RequestParam("productName") Optional<String> productName
  ) {
    var userId = adapter.getUserAccount().getId();
    return ResponseEntity.ok(this.orderJdbcRepository.findOrders(Optional.of(userId), productName, Optional.empty()));
  }

  @Operation(summary = "Finds a specific order for the logged in user")
  @GetMapping("/{id}")
  public ResponseEntity<OrderDetails> findOrder(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter,
      @Parameter(name = "id") @PathVariable Long id
  ) {
    var userId = adapter.getUserAccount().getId();
    var results = this.orderJdbcRepository.findOrders(Optional.of(userId), Optional.empty(), Optional.of(id));

    if (results.isEmpty())
      throw new OrderNotFoundException("Could not find an order with id: " + id);

    return ResponseEntity.ok(results.get(0));
  }

  @Operation(summary = "Places an order for the logged in user")
  @PostMapping
  @CustomerAuthorization
  public ResponseEntity<OrderDetails> placeOrder(
      @Valid @RequestBody PlaceOrderRequest orderRequest,
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter
  ) {
    var customer = adapter.getUserAccount();
    var placedOrder = this.orderService.placeOrder(orderRequest, customer);
    return ResponseEntity.created(URI.create("/api/v1/orders/" + placedOrder.id()))
      .body(this.orderService.findById(placedOrder.id()));
  }

  @Operation(summary = "Cancels an order for the logged in user")
  @PatchMapping("/{id}/cancel")
  public ResponseEntity<OrderDetails> cancelOrder(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter,
      @Parameter(name = "id") @PathVariable Long id
  ) {
    // we find by id and customer to ensure that the order belongs to the logged in user
    // this prevents users from cancelling other users orders
    var order = this.orderJpaRepository.findByIdAndCustomer(id, adapter.getUserAccount().getId())
      .orElseThrow(() -> new OrderNotFoundException("Could not find an order with id: " + id));

    order.setOrderStatus(OrderStatus.CANCELLED);

    this.orderJpaRepository.save(order);

    return ResponseEntity.ok(this.orderService.findById(id));
  }

}
