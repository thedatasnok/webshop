package no.ntnu.webshop.error.model;

import org.springframework.http.HttpStatus;

/**
 * A runtime exception that can be thrown to indicate that a specific HTTP status. Exceptions of
 * this type are handled by the {@link ExceptionAdvice} class. Specific exceptions should extend
 * this class, defining a specific error code.
 */
public class StatusCodeException extends RuntimeException {
  private final String code;
  private final HttpStatus status;

  public StatusCodeException(
      String message,
      String code,
      HttpStatus status
  ) {
    super(message);
    this.code = code;
    this.status = status;
  }

  /**
   * Returns the code of the error.
   * 
   * @return the code of the error
   */
  public String getCode() {
    return this.code;
  }

  /**
   * Returns the desired HTTP status of the error.
   * 
   * @return the desired HTTP status of the error
   */
  public HttpStatus getStatus() {
    return this.status;
  }

}
