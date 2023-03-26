package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class ItemFamilyNotFoundException extends StatusCodeException {

  public ItemFamilyNotFoundException(
      String message
  ) {
    super(message, "ITEM_FAMILY_NOT_FOUND", HttpStatus.NOT_FOUND);
  }

}
