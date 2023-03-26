package no.ntnu.webshop.error;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import no.ntnu.webshop.contracts.ErrorResponse;
import no.ntnu.webshop.error.model.StatusCodeException;

/**
 * Controller advice for handling exceptions.
 */
@RestControllerAdvice
public class ExceptionAdvice {

  /**
   * Handles exceptions of type {@link StatusCodeException}.
   */
  @ExceptionHandler(value = StatusCodeException.class)
  public ResponseEntity<ErrorResponse> handleStatusCodeException(
      StatusCodeException e
  ) {
    return ResponseEntity.status(e.getStatus())
      .body(
        new ErrorResponse(
          e.getStatus().value(),
          e.getCode(),
          e.getMessage()
        )
      );
  }

}
