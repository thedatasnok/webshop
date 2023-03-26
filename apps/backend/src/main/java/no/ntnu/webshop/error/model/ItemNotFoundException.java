package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class ItemNotFoundException extends StatusCodeException {

  public ItemNotFoundException(
      String message
  ) {
    super(message, "ITEM_NOT_FOUND", HttpStatus.NOT_FOUND);
  }

}
