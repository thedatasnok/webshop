package no.ntnu.webshop.contracts.validation.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import no.ntnu.webshop.contracts.validation.validator.PasswordConstraintValidator;

/**
 * The annotated string value must be a valid/strong password. Defines the min & max length, and the
 * minimum bits of entropy required for the password.
 * 
 * @see PasswordConstraintValidator
 */
@Documented
@Constraint(validatedBy = PasswordConstraintValidator.class)
@Target({
    ElementType.FIELD
})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassword {

  /**
   * The error message to display when the password is not strong enough.
   * 
   * @return the error message to display when the password is not strong enough
   */
  String message() default "Password is not strong enough!";

  /**
   * The minimum bits of entropy required for the password. Defaults to 48 bits.
   * 
   * @return the minimum bits of entropy required for the password
   */
  int minEntropy() default 24;

  /**
   * The minimum length of the password.
   * 
   * @return the minimum length of the password
   */
  int minLength() default 10;

  /**
   * The maximum length of the password.
   * 
   * @return the maximum length of the password
   */
  int maxLength() default 200;

  /**
   * The groups the constraint belongs to.
   * 
   * @return the groups the constraint belongs to
   */
  Class<?>[] groups() default {};

  /**
   * The payload associated to the constraint.
   * 
   * @return the payload associated to the constraint
   */
  Class<?>[] payload() default {};

}
