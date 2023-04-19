package no.ntnu.webshop.error;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import no.ntnu.webshop.contracts.ErrorResponse;
import no.ntnu.webshop.contracts.ValidationError;
import no.ntnu.webshop.contracts.ValidationErrorResponse;
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

  /**
   * Handles exception of type {@link MethodArgumentNotValidaException} and maps them to a response.
   */
  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException e
  ) {
    var errors = new HashMap<String, List<ValidationError>>();

    e.getFieldErrors().forEach(fieldError -> {
      var error = new ValidationError(
        fieldError.getDefaultMessage(),
        fieldError.getRejectedValue()
      );

      if (errors.containsKey(fieldError.getField())) {
        errors.get(fieldError.getField()).add(error);
      } else {
        errors.put(fieldError.getField(), new ArrayList<>(List.of(error)));
      }
    });

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
      .body(
        new ValidationErrorResponse(
          HttpStatus.BAD_REQUEST.value(),
          "VALIDATION_ERROR",
          errors
        )
      );
  }

}
