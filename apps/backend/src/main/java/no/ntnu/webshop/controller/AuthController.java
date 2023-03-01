package no.ntnu.webshop.controller;

import org.apache.tomcat.jni.Pool;
import org.hibernate.id.enhanced.PooledLoOptimizer;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.auth.SignInRequest;
import no.ntnu.webshop.contracts.auth.SignInResponse;
import no.ntnu.webshop.contracts.auth.SignUpRequest;
import no.ntnu.webshop.contracts.auth.SignUpResponse;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.JwtUtility;
import no.ntnu.webshop.utility.UserAccountRoleEnumType;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final JwtUtility jwtUtility;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final PasswordEncoder passwordEncoder;

  @PostMapping("/sign-up")
  public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest request) {
    if (request.fullName() == null)
      return ResponseEntity.badRequest().build();

    var userAccount = new UserAccount(
      request.fullName(), 
      request.email(), 
      passwordEncoder.encode(request.password()), 
      UserAccountRole.CUSTOMER
    );

    var savedAccount = this.userAccountJpaRepository.save(userAccount);

    return ResponseEntity.ok(SignUpResponse.builder()
      .id(savedAccount.getId())
      .fullName(savedAccount.getFullName())
      .email(savedAccount.getEmail())
      .build()
    );
  }

  @PostMapping("/sign-in")
  public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest request) {
    // TODO: Implement this
    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
  }

}
