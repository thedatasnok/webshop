package no.ntnu.webshop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.auth.SignInRequest;
import no.ntnu.webshop.contracts.auth.SignInResponse;
import no.ntnu.webshop.contracts.auth.SignUpResponse;
import no.ntnu.webshop.security.JwtUtility;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final JwtUtility jwtUtility;

  @PostMapping("/sign-up")
  public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpResponse request) {
    // TODO: Implement this
    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
  }
  
  @PostMapping("/sign-in")
  public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest request) {
    // TODO: Implement this
    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
  }

}
