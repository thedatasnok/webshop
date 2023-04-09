package no.ntnu.webshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.user.UpdateUserProfileRequest;
import no.ntnu.webshop.contracts.user.UserProfile;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;

/**
 * Controller responsible for endpoints that regard the currently authenticated user account.
 * 
 * The user account is determined by the access token that is expected to be sent with the request.
 * 
 * @see no.ntnu.webshop.security.AuthenticationRequestFilter Implementation of the filter that is
 *      responsible finding the user account from an access token
 */
@Tag(name = "User Context", description = "Endpoints that apply to the currently logged in user")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/me")
@PreAuthorize("isAuthenticated()")
public class UserContextController {
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final PasswordEncoder passwordEncoder;

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

}
