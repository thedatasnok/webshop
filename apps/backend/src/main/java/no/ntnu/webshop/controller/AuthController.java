package no.ntnu.webshop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.auth.SignInRequest;
import no.ntnu.webshop.contracts.auth.SignInResponse;
import no.ntnu.webshop.contracts.auth.SignUpRequest;
import no.ntnu.webshop.contracts.auth.SignUpResponse;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.JwtTokenType;
import no.ntnu.webshop.security.JwtUtility;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final JwtUtility jwtUtility;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  @PostMapping("/sign-up")
  public ResponseEntity<SignUpResponse> signUp(@RequestBody @Valid SignUpRequest request) {
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
  public ResponseEntity<SignInResponse> signIn(
      @RequestBody SignInRequest request, 
      HttpServletResponse response
  ) {
    var authentication = this.authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.email(),
        request.password()
      )
    );

    var accessToken = this.jwtUtility.generateToken(authentication, JwtTokenType.ACCESS_TOKEN);
    var refreshToken = this.jwtUtility.generateToken(authentication, JwtTokenType.REFRESH_TOKEN);

    response.addCookie(this.jwtUtility.createCookie(refreshToken));

    return ResponseEntity.ok(SignInResponse.builder()
      .accessToken(accessToken)
      .build()
    );
  }

  @GetMapping("/refresh")
  public ResponseEntity<SignInResponse> refresh(@CookieValue("refresh-token") String refreshToken) {
    if (refreshToken == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    var decodedToken = this.jwtUtility.decodeToken(refreshToken, JwtTokenType.REFRESH_TOKEN);
    var email = decodedToken.getClaim("username").asString();

    var foundUser = this.userAccountJpaRepository.findByEmail(email);

    if (foundUser.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    var userDetails = new UserAccountDetailsAdapter(foundUser.get());
    var authentication = new UsernamePasswordAuthenticationToken(
      userDetails, 
      null, 
      userDetails.getAuthorities()
    );

    var accessToken = this.jwtUtility.generateToken(authentication, JwtTokenType.ACCESS_TOKEN);

    return ResponseEntity.ok(SignInResponse.builder()
      .accessToken(accessToken)
      .build()
    );
  }

}
