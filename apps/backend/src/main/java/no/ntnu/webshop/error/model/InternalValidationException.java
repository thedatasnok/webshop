package no.ntnu.webshop.error.model;

import java.util.Set;

import jakarta.validation.ConstraintViolation;

/**
 * Class for throwing validation exceptions, which then get translated to the same format as the
 * {@link org.springframework.web.bind.MethodArgumentNotValidException
 * MethodArgumentNotValidException} from Spring.
 * 
 * @see no.ntnu.webshop.error.ExceptionAdvice ExceptionAdvice
 */
public class InternalValidationException extends RuntimeException {
  @SuppressWarnings("java:S1948") // suppresses warning about the set not being serializable, it is out of our control
  private final Set<ConstraintViolation<Object>> violations;

  public InternalValidationException(
      Set<ConstraintViolation<Object>> violations
  ) {
    this.violations = violations;
  }

  public Set<ConstraintViolation<Object>> getViolations() {
    return this.violations;
  }

}
