package no.ntnu.webshop.controller;

import java.util.HashSet;
import java.util.Set;

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
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.user.UpdateUserProfileRequest;
import no.ntnu.webshop.contracts.user.UserProfile;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/me")
public class UserContextController {
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final PasswordEncoder passwordEncoder;
  private final Validator validator;

  @Operation(summary = "Returns the user profile of the logged in user")
  @GetMapping
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<UserProfile> findProfile(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter
  ) {
    var userId = adapter.getUserAccount().getId();
    return ResponseEntity.ok(this.userAccountJpaRepository.findProfile(userId));
  }

  @Operation(summary = "Updates the user account information")
  @PatchMapping
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<UserProfile> updateProfile(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter,
      @RequestBody UpdateUserProfileRequest request
  ) {
    var user = adapter.getUserAccount();

    Set<ConstraintViolation<UpdateUserProfileRequest>> violations = new HashSet<>();

    violations.addAll(this.validator.validateProperty(request, "fullName"));
    violations.addAll(this.validator.validateProperty(request, "email"));

    user.setFullName(request.fullName());
    user.setEmail(request.email());

    if (request.validatePasswords()) {
      if (!request.passwordsMatch())
        throw new IllegalArgumentException();

      violations.addAll(this.validator.validateProperty(request, "password"));
      user.setPassword(this.passwordEncoder.encode(request.password()));
    }

    if (!violations.isEmpty())
      throw new IllegalArgumentException();

    this.userAccountJpaRepository.save(user);

    return ResponseEntity.ok(this.userAccountJpaRepository.findProfile(user.getId()));
  }

}
