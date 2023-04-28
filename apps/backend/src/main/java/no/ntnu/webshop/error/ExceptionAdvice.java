package no.ntnu.webshop.error;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import no.ntnu.webshop.contracts.ErrorResponse;
import no.ntnu.webshop.contracts.ValidationError;
import no.ntnu.webshop.contracts.ValidationErrorResponse;
import no.ntnu.webshop.error.model.InternalValidationException;
import no.ntnu.webshop.error.model.StatusCodeException;

/**
 * Controller advice for handling exceptions.
 */
@Slf4j
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

  /**
   * Handles exception of type {@link InternalValidationException} and maps them to a response.
   */
  @ExceptionHandler(value = InternalValidationException.class)
  public ResponseEntity<ValidationErrorResponse> handleInternalValidationException(
      InternalValidationException e
  ) {
    var errors = new HashMap<String, List<ValidationError>>();

    e.getViolations().forEach(violation -> {
      var error = new ValidationError(
        violation.getMessage(),
        violation.getInvalidValue()
      );

      var key = violation.getPropertyPath().toString();

      if (errors.containsKey(key)) {
        errors.get(key).add(error);
      } else {
        errors.put(key, new ArrayList<>(List.of(error)));
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

  /**
   * Handles exception of type {@link DataIntegrityViolationException} and maps them to a response.
   */
  @ExceptionHandler(value = DataIntegrityViolationException.class)
  public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(
      DataIntegrityViolationException e
  ) {
    log.error("Data integrity violation occured: {}", e.getMessage());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
      .body(
        new ErrorResponse(
          HttpStatus.BAD_REQUEST.value(),
          "GENERIC_INTEGRITY_ERROR",
          "The request could not be processed due to a violation of data integrity."
        )
      );
  }

}
