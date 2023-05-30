package no.ntnu.webshop.security;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.auth0.jwt.exceptions.SignatureVerificationException;

import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;

class JwtUtilityTests {
  private JwtUtility jwtUtility;
  private Authentication authentication;
  private UserAccount testUser;

  private static final Integer ACCESS_TOKEN_EXPIRATION_MS = 1000;
  private static final Integer REFRESH_TOKEN_EXPIRATION_MS = 2000;

  @BeforeEach
  void setup() {
    this.jwtUtility = new JwtUtility(
      "webshop-mock",
      "access-token-secret",
      "refresh-token-secret",
      ACCESS_TOKEN_EXPIRATION_MS,
      REFRESH_TOKEN_EXPIRATION_MS
    );

    this.testUser = new UserAccount(
      "Bob the Mocker",
      "bob@mocker.org",
      "not-a-real-password",
      UserAccountRole.CUSTOMER
    );

    var userDetails = new UserAccountDetailsAdapter(this.testUser);

    this.authentication = new UsernamePasswordAuthenticationToken(
      userDetails,
      null,
      userDetails.getAuthorities()
    );
  }

  @Test
  void generatedTokensAreParseable() {
    var accessToken = this.jwtUtility.generateToken(this.authentication, JwtTokenType.ACCESS_TOKEN);
    assertDoesNotThrow(() -> this.jwtUtility.decodeToken(accessToken, JwtTokenType.ACCESS_TOKEN));

    var refreshToken = this.jwtUtility.generateToken(this.authentication, JwtTokenType.REFRESH_TOKEN);
    assertDoesNotThrow(() -> this.jwtUtility.decodeToken(refreshToken, JwtTokenType.REFRESH_TOKEN));
  }

  // verifies that the different types of tokens are signed with different algorithms/secrets.
  @Test
  void differentAlgorithmsAreUsed() {
    var accessToken = this.jwtUtility.generateToken(this.authentication, JwtTokenType.ACCESS_TOKEN);
    var refreshToken = this.jwtUtility.generateToken(this.authentication, JwtTokenType.REFRESH_TOKEN);

    assertNotEquals(accessToken, refreshToken);

    assertThrows(
      SignatureVerificationException.class,
      () -> this.jwtUtility.decodeToken(accessToken, JwtTokenType.REFRESH_TOKEN)
    );

    assertThrows(
      SignatureVerificationException.class,
      () -> this.jwtUtility.decodeToken(refreshToken, JwtTokenType.ACCESS_TOKEN)
    );
  }

  @Test
  void claimsAreConsistent() {
    var accessToken = this.jwtUtility.generateToken(this.authentication, JwtTokenType.ACCESS_TOKEN);
    var accessTokenClaims = this.jwtUtility.decodeToken(accessToken, JwtTokenType.ACCESS_TOKEN).getClaims();

    var refreshToken = this.jwtUtility.generateToken(this.authentication, JwtTokenType.REFRESH_TOKEN);
    var refreshTokenClaims = this.jwtUtility.decodeToken(refreshToken, JwtTokenType.REFRESH_TOKEN).getClaims();

    assertEquals(this.testUser.getEmail(), accessTokenClaims.get("username").asString());
    assertEquals(this.testUser.getEmail(), refreshTokenClaims.get("username").asString());

    assertEquals(this.testUser.getFullName(), accessTokenClaims.get("fullName").asString());
    assertEquals(this.testUser.getFullName(), refreshTokenClaims.get("fullName").asString());

    assertEquals(this.testUser.getRole().toString(), accessTokenClaims.get("role").asString());
    assertEquals(this.testUser.getRole().toString(), refreshTokenClaims.get("role").asString());
  }

}
