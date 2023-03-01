package no.ntnu.webshop.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

/**
 * Utility class for working with JWT tokens.
 */
@Component
public class JwtUtility {
  private final String tokenIssuer;
  private final int accessTokenExpiration;
  private final int refreshTokenExpiration;

  private final Algorithm accessTokenAlgorithm;
  private final Algorithm refreshTokenAlgorithm;

  public JwtUtility(
      @Value("${no.ntnu.webshop.jwt.token-issuer}")
      String tokenIssuer,
      @Value("${no.ntnu.webshop.jwt.access-token-secret}")
      String accessTokenSecret,
      @Value("${no.ntnu.webshop.jwt.refresh-token-secret}")
      String refreshTokenSecret,
      @Value("${no.ntnu.webshop.jwt.access-token-expiration-ms}")
      int accessTokenExpiration,
      @Value("${no.ntnu.webshop.jwt.refresh-token-expiration-ms}")
      int refreshTokenExpiration
  ) {
    this.tokenIssuer = tokenIssuer;
    this.accessTokenExpiration = accessTokenExpiration;
    this.refreshTokenExpiration = refreshTokenExpiration;
    this.accessTokenAlgorithm = Algorithm.HMAC256(accessTokenSecret);
    this.refreshTokenAlgorithm = Algorithm.HMAC256(refreshTokenSecret);
  }
  
  /**
   * Resolves the algorithm to use for signing a token for a given token type.
   * 
   * @param tokenType the type of token to resolve the algorithm for
   * 
   * @return the algorithm to use for signing a token of the given token type
   */
  private Algorithm resolveAlgorithm(JwtTokenType tokenType) {
    return switch(tokenType) {
      case ACCESS_TOKEN -> this.accessTokenAlgorithm;
      case REFRESH_TOKEN -> this.refreshTokenAlgorithm;
    };
  }

  /**
   * Decodes a token of a given type, and verifies it's validity.
   * Throws an exception if the token is invalid.
   * 
   * @param token the token to decode
   * @param tokenType the type of token to decode
   * 
   * @return true if the token is valid, false otherwise
   */
  public DecodedJWT decodeToken(String token, JwtTokenType tokenType) {
    var algorithm = this.resolveAlgorithm(tokenType);

    var verifier = JWT.require(algorithm)
        .withIssuer(this.tokenIssuer)
        .build();

    return verifier.verify(token);
  }

  /**
   * Generates a JWT token for the given authentication.
   * 
   * @param authentication the authentication to generate a token for
   * @param tokenType the type of token to generate (access or refresh)
   * 
   * @return the generated JWT token
   */
  public String generateToken(Authentication authentication, JwtTokenType tokenType) {
    var expirationMillis = switch(tokenType) {
      case ACCESS_TOKEN -> this.accessTokenExpiration;
      case REFRESH_TOKEN -> this.refreshTokenExpiration;
    };

    var algorithm = this.resolveAlgorithm(tokenType);
    var principal = (UserAccountDetailsAdapter) authentication.getPrincipal();

    return JWT.create()
        .withIssuer(this.tokenIssuer)
        .withClaim("username", principal.getUsername())
        .withClaim("role", principal.getUserAccount().getRole().toString())
        .withIssuedAt(Instant.now())
        .withExpiresAt(Instant.now().plus(expirationMillis, ChronoUnit.MILLIS))
        .sign(algorithm);
  }

}
