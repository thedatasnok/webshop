package no.ntnu.webshop.contracts.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SignUpRequest(
  @NotNull @Size(min = 6) String username,
  @NotNull @Email String email,
  @NotNull String password, // TODO: Enforce password complexity/strength
  @NotNull String passwordConfirmation
) {

  @AssertTrue
  boolean isPasswordConfirmationValid() {
    return this.password.equals(this.passwordConfirmation);
  }

}
