package no.ntnu.webshop.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.UserAccountJpaRepository;

@Service
@RequiredArgsConstructor
public class UserAccountService {
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final PasswordEncoder passwordEncoder;

  /**
   * Creates a new user account, saves it to the database and returns the created instance.
   * 
   * @param fullName the full name of the user
   * @param email    the email of the user
   * @param password the password of the user
   * @param role     the role of the user
   * 
   * @return the created user account
   */
  public UserAccount createUserAccount(
      String fullName,
      String email,
      String password,
      UserAccountRole role
  ) {
    return this.userAccountJpaRepository.save(
      new UserAccount(
        fullName,
        email,
        this.passwordEncoder.encode(password),
        role
      )
    );
  }

}
