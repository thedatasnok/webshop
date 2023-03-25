package no.ntnu.webshop.controller;

import java.net.URI;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
import no.ntnu.webshop.contracts.order.OrderSummary;
import no.ntnu.webshop.contracts.order.PlaceOrderRequest;
import no.ntnu.webshop.model.Address;
import no.ntnu.webshop.model.Order;
import no.ntnu.webshop.model.OrderLine;
import no.ntnu.webshop.model.PaymentMethod;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.repository.ProductPriceJpaRepository;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;
import no.ntnu.webshop.security.annotation.CustomerAuthorization;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;

@Tag(name = "Orders")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {
  private final OrderJpaRepository orderJpaRepository;
  private final ProductPriceJpaRepository productPriceJpaRepository;

  @GetMapping("/summary")
  @ShopWorkerAuthorization
  public ResponseEntity<List<OrderSummary>> findDailyOrderSummary(
      @RequestParam("since") Optional<Instant> since
  ) {
    var sinceInstant = since.orElse(Instant.now().minus(7, ChronoUnit.DAYS));

    return ResponseEntity.ok(this.orderJpaRepository.findDailyOrderSummary(Date.from(sinceInstant)));
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
      PaymentMethod.fromString(orderRequest.paymentMethod())
    );

    var productIds = orderRequest.lines().keySet();

    var prices = this.productPriceJpaRepository.findAllCurrentPricesByProductIds(productIds);

    // TODO: Define a proper exception for this w/a response code
    // it should never be possible when using the frontend since products with no price are not shown
    if (prices.size() != productIds.size())
      throw new IllegalArgumentException();

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

    // TODO: Define a proper response body for this, maybe using the same DTO as when listing orders
    return ResponseEntity.created(URI.create("/api/v1/orders/" + savedOrder.getId()))
      .body(new GenericResponse("Order placed successfully"));
  }

}
