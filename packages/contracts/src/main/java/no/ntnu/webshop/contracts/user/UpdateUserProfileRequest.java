package no.ntnu.webshop.contracts.user;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;
import no.ntnu.webshop.contracts.utility.annotation.Nullable;
import no.ntnu.webshop.contracts.validation.annotation.ValidPassword;

@GenerateTypeScript
public record UpdateUserProfileRequest(
  @NotBlank @Email String email,
  @NotBlank String fullName,
  @Nullable @ValidPassword String password,
  @Nullable @ValidPassword String passwordConfirmation
) {

  public boolean updatePassword() {
    return this.password != null && this.passwordConfirmation != null;
  }
  
  @AssertTrue
  public boolean passwordsMatch() {
    if (this.password == null && this.passwordConfirmation == null) return true;
    if (this.password == null || this.passwordConfirmation == null) return false;

    return this.password.equals(this.passwordConfirmation);
  }

}
