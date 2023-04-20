package no.ntnu.webshop.utility;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.security.JwtTokenType;
import no.ntnu.webshop.security.JwtUtility;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;

@Service
@RequiredArgsConstructor
public class AuthorizationTestUtility {
  private final JwtUtility jwtUtility;

  /**
   * Utility method to generate a JWT access token header for a given user account.
   * 
   * @param account the account to generate a JWT token for
   * 
   * @return a JWT token header, including the "Bearer " prefix
   */
  public String generateJwt(
      UserAccount account
  ) {
    var userDetails = new UserAccountDetailsAdapter(account);
    var authentication = new UsernamePasswordAuthenticationToken(
      userDetails,
      null,
      userDetails.getAuthorities()
    );
    return "Bearer ".concat(this.jwtUtility.generateToken(authentication, JwtTokenType.ACCESS_TOKEN));
  }

}
