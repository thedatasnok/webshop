package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class OrderNotFoundException extends StatusCodeException {

  public OrderNotFoundException(
      String message
  ) {
    super(message, "ORDER_NOT_FOUND", HttpStatus.NOT_FOUND);
  }

}
