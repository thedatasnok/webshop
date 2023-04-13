package no.ntnu.webshop.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.ntnu.webshop.repository.UserAccountJpaRepository;

/**
 * Authentication request filter for validating and parsing access tokens to set the SecurityContext
 * for the given request. Runs once per request.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationRequestFilter extends OncePerRequestFilter {
  private final JwtUtility jwtUtility;
  private final UserAccountJpaRepository userAccountRepository;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain
  ) throws ServletException, IOException {
    var token = this.getBearerToken(request);

    // access tokens are expected here, refresh tokens are only used
    // to generate a new access token when the current one expires
    // and should not be passed through this filter
    if (token != null) {
      try {
        var decodedToken = this.jwtUtility.decodeToken(token, JwtTokenType.ACCESS_TOKEN);
        var email = decodedToken.getClaim("username").asString();
        var foundUser = this.userAccountRepository.findByEmail(email);

        foundUser.ifPresent(user -> {
          var userDetails = new UserAccountDetailsAdapter(user);
          var authentication = new UsernamePasswordAuthenticationToken(
            userDetails,
            null,
            userDetails.getAuthorities()
          );

          SecurityContextHolder.getContext().setAuthentication(authentication);
        });
      } catch (Exception e) {
        // either token is invalid, or the user account does not exist anymore
        log.debug("Not setting authentication context for request.", e);
      }

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
  private String getBearerToken(
      HttpServletRequest request
  ) {
    var authHeader = request.getHeader("Authorization");
    var bearerPrefix = "Bearer ";

    if (authHeader != null && authHeader.startsWith(bearerPrefix)) {
      return authHeader.substring(bearerPrefix.length());
    }

    return null;
  }

}
