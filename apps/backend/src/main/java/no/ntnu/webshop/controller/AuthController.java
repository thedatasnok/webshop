package no.ntnu.webshop.controller;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.GenericResponse;
import no.ntnu.webshop.contracts.auth.SignInRequest;
import no.ntnu.webshop.contracts.auth.SignInResponse;
import no.ntnu.webshop.contracts.auth.SignUpRequest;
import no.ntnu.webshop.contracts.auth.SignUpResponse;
import no.ntnu.webshop.event.model.CustomerRegisteredEvent;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.JwtTokenType;
import no.ntnu.webshop.security.JwtUtility;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;
import no.ntnu.webshop.service.UserAccountService;

/**
 * Controller responsible for endpoints that do operations related to authenticating user accounts.
 */
@Tag(name = "Authentication", description = "Operations related to authenticating user accounts")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final JwtUtility jwtUtility;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final UserAccountService userAccountService;
  private final AuthenticationManager authenticationManager;
  private final ApplicationEventPublisher eventPublisher;

  @Operation(summary = "Signs up a new user")
  @PostMapping("/sign-up")
  public ResponseEntity<SignUpResponse> signUp(
      @RequestBody @Valid SignUpRequest request,
      HttpServletResponse response
  ) {
    // if no shop owner is registered, the user will be signed up as a shop owner
    var role = this.userAccountJpaRepository.hasRegisteredOfRole(UserAccountRole.SHOP_OWNER.toString())
        ? UserAccountRole.CUSTOMER
        : UserAccountRole.SHOP_OWNER;

    var userAccount = this.userAccountService
      .createUserAccount(request.fullName(), request.email(), request.password(), role);

    var userDetails = new UserAccountDetailsAdapter(userAccount);

    var authentication = new UsernamePasswordAuthenticationToken(
      userDetails,
      null,
      userDetails.getAuthorities()
    );

    var accessToken = this.jwtUtility.generateToken(authentication, JwtTokenType.ACCESS_TOKEN);
    var refreshToken = this.jwtUtility.generateToken(authentication, JwtTokenType.REFRESH_TOKEN);

    response.addCookie(this.jwtUtility.createCookie(refreshToken));

    this.eventPublisher.publishEvent(new CustomerRegisteredEvent(userAccount));

    return ResponseEntity.ok(
      SignUpResponse.builder()
        .id(userAccount.getId())
        .fullName(userAccount.getFullName())
        .email(userAccount.getEmail())
        .accessToken(accessToken)
        .build()
    );
  }

  @Operation(summary = "Signs in a user")
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

    return ResponseEntity.ok(SignInResponse.builder().accessToken(accessToken).build());
  }

  @Operation(summary = "Uses the refresh token to obtain a new access token")
  @GetMapping("/refresh")
  public ResponseEntity<SignInResponse> refresh(
      @CookieValue("refresh-token") String refreshToken
  ) {
    if (refreshToken == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    var decodedToken = this.jwtUtility.decodeToken(refreshToken, JwtTokenType.REFRESH_TOKEN);
    var email = decodedToken.getClaim("username").asString();

    var foundUser = this.userAccountJpaRepository.findByEmail(email);

    if (foundUser.isEmpty())
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    var userDetails = new UserAccountDetailsAdapter(foundUser.get());
    var authentication = new UsernamePasswordAuthenticationToken(
      userDetails,
      null,
      userDetails.getAuthorities()
    );

    var accessToken = this.jwtUtility.generateToken(authentication, JwtTokenType.ACCESS_TOKEN);

    return ResponseEntity.ok(SignInResponse.builder().accessToken(accessToken).build());
  }

  @Operation(
    summary = "Signs out the user",
    description = "Signs out the user in with their refresh token, by changing the max age of the token cookie to 0"
  )
  @PostMapping("/sign-out")
  public ResponseEntity<GenericResponse> signOut(
      @CookieValue("refresh-token") String refreshToken,
      HttpServletResponse response
  ) {
    // if we want to invalidate tokens, we can do it here.
    // for now, we just "delete" the cookie

    var cookie = this.jwtUtility.createCookie(refreshToken);

    // manually override the age of the cookie to 0
    // this will cause the browser to delete/expire the cookie
    cookie.setMaxAge(0);

    response.addCookie(cookie);

    return ResponseEntity.ok(GenericResponse.builder().message("Successfully signed out!").build());
  }

}
