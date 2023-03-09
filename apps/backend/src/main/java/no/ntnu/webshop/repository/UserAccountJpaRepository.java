package no.ntnu.webshop.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.contracts.user.UserProfile;
import no.ntnu.webshop.model.UserAccount;

public interface UserAccountJpaRepository extends JpaRepository<UserAccount, UUID> {

  Optional<UserAccount> findByEmail(
      String email
  );

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

}
