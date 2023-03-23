package no.ntnu.webshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.user.UserProfile;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/me")
public class UserContextController {
  private final UserAccountJpaRepository userAccountJpaRepository;
  
  @Operation(summary = "Returns the user profile of the logged in user")
  @GetMapping
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<UserProfile> findProfile(
      @AuthenticationPrincipal UserAccountDetailsAdapter adapter
  ) {
    var userId = adapter.getUserAccount().getId();
    return ResponseEntity.ok(this.userAccountJpaRepository.findProfile(userId));
  }

}
