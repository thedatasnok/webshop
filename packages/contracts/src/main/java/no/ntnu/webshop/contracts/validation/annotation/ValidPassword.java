package no.ntnu.webshop.contracts.validation.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import no.ntnu.webshop.contracts.validation.validator.PasswordConstraintValidator;

@Documented
@Constraint(validatedBy = PasswordConstraintValidator.class)
@Target({ ElementType.FIELD })
public @interface ValidPassword {
  
  String message() default "Password is not strong enough!";

}
