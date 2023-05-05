package no.ntnu.webshop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.user.UserAccountListItem;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.annotation.ShopOwnerAuthorization;

@Tag(name = "User Accounts", description = "Operations on user accounts")
@RestController
@ShopOwnerAuthorization
@RequiredArgsConstructor
@RequestMapping("/api/v1/user-accounts")
public class UserAccountController {
  private final UserAccountJpaRepository userAccountJpaRepository;

  @Operation(summary = "Lists all registered user accounts")
  @GetMapping
  public ResponseEntity<List<UserAccountListItem>> findUserAccounts(
      @Parameter(description = "The user account's username, will be matched as a substring")
      @RequestParam("fullName") Optional<String> fullName,
      @Parameter(description = "The user account's email address, will be matched as a substring")
      @RequestParam("email") Optional<String> email,
      @Parameter(description = "Whether the user account is verified or not")
      @RequestParam("verified") Optional<Boolean> verified
  ) {
    return ResponseEntity
      .ok(this.userAccountJpaRepository.findUserAccounts(fullName, email, verified, Sort.unsorted()));
  }

}
