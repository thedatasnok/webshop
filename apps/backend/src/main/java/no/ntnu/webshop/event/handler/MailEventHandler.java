package no.ntnu.webshop.event.handler;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.ntnu.webshop.event.model.CustomerRegisteredEvent;
import no.ntnu.webshop.event.model.OrderConfirmationEvent;
import no.ntnu.webshop.repository.OrderJdbcRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailEventHandler {
  private final OrderJdbcRepository orderJdbcRepository;
  private final RestTemplate restTemplate = new RestTemplate();

  @Value("${no.ntnu.webshop.mail-service.host}")
  private String host;

  @Value("${no.ntnu.webshop.mail-service.port}")
  private int port;

  @Value("${no.ntnu.webshop.mail-service.enabled}")
  private boolean enabled;

  private String mailUrl(
      String path
  ) throws MalformedURLException {
    return new URL(
      "http",
      this.host,
      this.port,
      path
    ).toString();
  }

  @EventListener(OrderConfirmationEvent.class)
  public void handleOrderConfirmationEvent(
      OrderConfirmationEvent event
  ) {
    if (!this.enabled)
      return;

    var placedOrder = this.orderJdbcRepository
      .findOrders(Optional.of(event.customer().getId()), Optional.empty(), Optional.of(event.orderId()));

    try {
      this.restTemplate.postForObject(
        this.mailUrl("/mails/order-confirmation"),
        Map.of("to", event.customer().getEmail(), "order", placedOrder),
        Object.class
      );
    } catch (Exception e) {
      log.error("Failed to send order confirmation email: {}", e.getMessage());
    }
  }

  @EventListener(CustomerRegisteredEvent.class)
  public void handleCustomerRegisteredEvent(
      CustomerRegisteredEvent event
  ) {
    if (!this.enabled)
      return;

    try {
      this.restTemplate.postForObject(
        this.mailUrl("/mails/sign-up-confirmation"),
        Map.of("to", event.customer().getEmail()),
        Object.class
      );
    } catch (Exception e) {
      log.error("Failed to send customer registered email: {}", e.getMessage());
    }
  }

}
