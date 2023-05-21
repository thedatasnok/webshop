package no.ntnu.webshop.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  @Transactional
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

  /**
   * Deletes all the given user accounts.
   * 
   * @param accounts the accounts to delete
   */
  public void deleteAll(UserAccount... accounts) {
    this.userAccountJpaRepository.deleteAll(List.of(accounts));
  }

}
