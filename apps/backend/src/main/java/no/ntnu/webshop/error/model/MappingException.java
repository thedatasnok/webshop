package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

public class MappingException extends StatusCodeException {

  public MappingException(
      String message
  ) {
    super(message, "INTERNAL_MAPPING_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
