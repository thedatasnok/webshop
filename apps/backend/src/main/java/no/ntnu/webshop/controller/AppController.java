package no.ntnu.webshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.UserAccountJpaRepository;

@Tag(name = "App", description = "Operations related to app-level state and settings")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/app")
public class AppController {
  private final UserAccountJpaRepository userAccountJpaRepository;

  @Operation(summary = "Checks if the app is initialized with a administrative user account")
  @GetMapping("/initialized")
  public ResponseEntity<Boolean> isInitialized() {
    return ResponseEntity.ok(this.userAccountJpaRepository.hasRegisteredOfRole(UserAccountRole.SHOP_OWNER.toString()));
  }

}
