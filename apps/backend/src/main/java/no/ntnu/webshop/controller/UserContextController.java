package no.ntnu.webshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.ntnu.webshop.contracts.ErrorResponse;
import no.ntnu.webshop.contracts.GenericResponse;
import no.ntnu.webshop.contracts.user.UpdateUserProfileRequest;
import no.ntnu.webshop.contracts.user.UserProfile;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.JwtUtility;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;
import no.ntnu.webshop.security.annotation.AuthenticatedAuthorization;

/**
 * Controller responsible for endpoints that do operations on/for the currently authenticated user
 * account.
 * 
 * The user account is determined by the access token that is expected to be sent with the request.
 * 
 * @see no.ntnu.webshop.security.AuthenticationRequestFilter Implementation of the filter that is
 *      responsible finding the user account from an access token
 */
@Slf4j
@Tag(name = "User Context", description = "Operations that apply to the currently logged in user")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/me")
@AuthenticatedAuthorization
public class UserContextController {
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtility jwtUtility;

  @Operation(summary = "Returns the user profile of the logged in user")
  @GetMapping
  public ResponseEntity<UserProfile> findProfile(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter
  ) {
    var userId = adapter.getUserAccount().getId();
    return ResponseEntity.ok(this.userAccountJpaRepository.findProfile(userId));
  }

  @Operation(summary = "Updates the user account information")
  @PatchMapping
  public ResponseEntity<UserProfile> updateProfile(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter,
      @Valid @RequestBody UpdateUserProfileRequest request
  ) {
    var user = adapter.getUserAccount();

    user.setFullName(request.fullName());
    user.setEmail(request.email());

    if (request.updatePassword()) {
      user.setPassword(this.passwordEncoder.encode(request.password()));
    }

    this.userAccountJpaRepository.save(user);

    return ResponseEntity.ok(this.userAccountJpaRepository.findProfile(user.getId()));
  }

  @Operation(
    summary = "Deletes the user account for the currently logged in user",
    description = "Permanently deletes the user account for the currently logged in user. This action is irreversible."
  )
  @DeleteMapping
  public ResponseEntity<Object> deleteAccount(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter,
      @CookieValue("refresh-token") String refreshToken,
      HttpServletResponse response
  ) {
    try {
      this.userAccountJpaRepository.deleteById(adapter.getUserAccount().getId());
    } catch (Exception e) {
      log.error("Failed to delete user account: {}", e.getMessage());
      log.debug("Failed to delete user account", e);

      return ResponseEntity.internalServerError()
        .body(
          new ErrorResponse(
            500,
            "FAILED_TO_DELETE_USER_ACCOUNT",
            "Failed to delete user account"
          )
        );
    }

    var cookie = this.jwtUtility.createCookie(refreshToken);

    // expire the refresh token cookie
    cookie.setMaxAge(0);

    response.addCookie(cookie);

    return ResponseEntity.ok(GenericResponse.builder().message("User account deleted").build());
  }

}
