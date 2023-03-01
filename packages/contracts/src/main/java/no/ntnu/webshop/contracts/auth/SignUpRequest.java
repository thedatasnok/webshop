package no.ntnu.webshop.contracts.auth;

import org.springframework.boot.context.properties.bind.Name;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;
import no.ntnu.webshop.contracts.validation.annotation.ValidPassword;

@GenerateTypeScript
public record SignUpRequest(
  @NotNull String fullName,
  @NotNull @Email String email,
  @NotNull @ValidPassword String password,
  @NotNull String passwordConfirmation
) {

  @AssertTrue
  boolean isPasswordConfirmationValid() {
    return this.password.equals(this.passwordConfirmation);
  }

}
