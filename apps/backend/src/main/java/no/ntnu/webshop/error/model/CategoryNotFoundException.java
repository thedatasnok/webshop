package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class CategoryNotFoundException extends StatusCodeException {

  public CategoryNotFoundException(
      String message
  ) {
    super(message, "CATEGORY_NOT_FOUND", HttpStatus.NOT_FOUND);
  }

}
