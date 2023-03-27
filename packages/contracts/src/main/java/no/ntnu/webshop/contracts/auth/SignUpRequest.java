package no.ntnu.webshop.contracts.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;
import no.ntnu.webshop.contracts.validation.annotation.ValidPassword;

@GenerateTypeScript
public record SignUpRequest(
  @NotBlank String fullName,
  @NotBlank @Email String email,
  @NotBlank @ValidPassword String password,
  @NotBlank String passwordConfirmation
) {

  @AssertTrue
  boolean isPasswordConfirmationValid() {
    return this.password.equals(this.passwordConfirmation);
  }

}
