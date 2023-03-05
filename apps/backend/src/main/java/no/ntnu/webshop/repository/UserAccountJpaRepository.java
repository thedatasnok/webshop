package no.ntnu.webshop.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.webshop.model.UserAccount;

public interface UserAccountJpaRepository extends JpaRepository<UserAccount, UUID> {

  Optional<UserAccount> findByEmail(
      String email
  );

}
