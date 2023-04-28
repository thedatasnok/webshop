package no.ntnu.webshop.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.contracts.user.UserProfile;
import no.ntnu.webshop.model.UserAccount;

public interface UserAccountJpaRepository extends JpaRepository<UserAccount, UUID> {

  /**
   * Finds a user account by its registered email.
   * 
   * @param email the email of the user to find
   * 
   * @return an optional containing the user account if found, otherwise an empty optional
   */
  Optional<UserAccount> findByEmail(
      String email
  );

  /**
   * Finds the user profile for a given user.
   * 
   * @param id the id of the user to find the profile for
   * 
   * @return the user profile of the given user
   */
  @Query("""
    SELECT new no.ntnu.webshop.contracts.user.UserProfile(
      user.id,
      user.fullName,
      user.email,
      user.emailVerified,
      CAST(user.role AS STRING),
      user.createdAt
    )
    FROM UserAccount user
    WHERE user.id = :id
    """)
  UserProfile findProfile(
      @Param("id") UUID id
  );

  /**
   * Query that checks if any user account is registered with the given role.
   * 
   * @param role the role to check if any user account is registered with
   * 
   * @return true if at least one user account is registered with the given role, otherwise false
   */
  @Query("""
    SELECT CASE WHEN EXISTS(
      SELECT 1 FROM UserAccount u WHERE CAST(u.role AS STRING) = :role
    ) THEN TRUE ELSE FALSE END
    """)
  boolean hasRegisteredOfRole(
      @Param("role") String role
  );

}
