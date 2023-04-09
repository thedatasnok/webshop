package no.ntnu.webshop.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.order.OrderSummary;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;

@Tag(name = "Orders")
@RestController
@ShopWorkerAuthorization
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {
  private final OrderJpaRepository orderJpaRepository;

  @GetMapping("/summary")
  public ResponseEntity<List<OrderSummary>> findDailyOrderSummary(
      @RequestParam("since") Optional<Instant> since
  ) {
    var sinceInstant = since.orElse(Instant.now().minus(7, ChronoUnit.DAYS));

    return ResponseEntity.ok(this.orderJpaRepository.findDailyOrderSummary(Date.from(sinceInstant)));
  }

  @GetMapping
  public ResponseEntity<List<Object>> findOrders() {
    return ResponseEntity.ok(null);
  }

  @PutMapping("/{orderId}")
  public ResponseEntity<Object> updateOrder() {
    return ResponseEntity.ok(null);
  }


}
