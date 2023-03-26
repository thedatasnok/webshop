package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class ProductNotFoundException extends StatusCodeException {

  public ProductNotFoundException(
      String message
  ) {
    super(message, "PRODUCT_NOT_FOUND", HttpStatus.NOT_FOUND);
  }

}
