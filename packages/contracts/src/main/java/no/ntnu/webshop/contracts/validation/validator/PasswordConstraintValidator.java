package no.ntnu.webshop.contracts.validation.validator;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.EnglishSequenceData;
import org.passay.IllegalSequenceRule;
import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.WhitespaceRule;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import no.ntnu.webshop.contracts.validation.annotation.ValidPassword;
import no.ntnu.webshop.contracts.validation.rule.ShannonEntropyRule;

/**
 * Represents a constraint validator implementation for the {@link ValidPassword} annotation. Checks
 * that the password meets certain requirements, and is stronger than a set level of entropy.
 * 
 * @see ValidPassword
 */
public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {
  private PasswordValidator validator;

  @Override
  public void initialize(
      ValidPassword annotation
  ) {
    this.validator = new PasswordValidator(
      new LengthRule(
        annotation.minLength(),
        annotation.maxLength()
      ),
      // require at least one character from each of these groups
      new CharacterRule(EnglishCharacterData.UpperCase),
      new CharacterRule(EnglishCharacterData.LowerCase),
      new CharacterRule(EnglishCharacterData.Digit),
      // illegal character sequences
      new IllegalSequenceRule(EnglishSequenceData.Alphabetical),
      new IllegalSequenceRule(EnglishSequenceData.Numerical),
      new IllegalSequenceRule(EnglishSequenceData.USQwerty),
      new ShannonEntropyRule(annotation.minEntropy()),
      // no whitespaces
      new WhitespaceRule()
    );
  }

  @Override
  public boolean isValid(
      String password,
      ConstraintValidatorContext context
  ) {
    var result = this.validator.validate(new PasswordData(password));

    if (result.isValid()) {
      return true;
    } else {
      context.disableDefaultConstraintViolation();
      validator.getMessages(result)
        .forEach(message -> context.buildConstraintViolationWithTemplate(message).addConstraintViolation());

      return false;
    }
  }

}
