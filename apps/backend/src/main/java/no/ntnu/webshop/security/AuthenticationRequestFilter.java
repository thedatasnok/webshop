package no.ntnu.webshop.security;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/**
 * Filter for validating access tokens.
 * Runs once per request.
 */
@Component
@RequiredArgsConstructor
public class AuthenticationRequestFilter extends OncePerRequestFilter {
  private final JwtUtility jwtUtility;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, 
      HttpServletResponse response, 
      FilterChain filterChain
  ) throws ServletException, IOException {
    var token = getBearerToken(request);

    // access tokens are expected here, refresh tokens are only used
    // to generate a new access token when the current one expires
    // and should not be passed through this filter
    if (token != null && this.jwtUtility.isValid(token, JwtTokenType.ACCESS_TOKEN)) {
      // TODO: Set the principal in the security context
    }

    filterChain.doFilter(request, response);
  }
  
  /**
   * Extracts the bearer token from the Authorization header.
   * 
   * @param request the request to extract the token from
   * 
   * @return the bearer token, or null if no token was found
   */
  public static String getBearerToken(HttpServletRequest request) {
    var authHeader = request.getHeader("Authorization");
    var bearerPrefix = "Bearer ";

    if (authHeader != null && authHeader.startsWith(bearerPrefix)) {
      return authHeader.substring(bearerPrefix.length());
    }

    return null;
  }

  
}
