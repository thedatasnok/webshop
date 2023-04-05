package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class ProductFamilyNotFoundException extends StatusCodeException {

  public ProductFamilyNotFoundException(
      String message
  ) {
    super(message, "PRODUCT_FAMILY_NOT_FOUND", HttpStatus.NOT_FOUND);
  }

}
