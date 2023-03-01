package no.ntnu.webshop.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.webshop.model.UserAccount;

public interface UserAccountJpaRepository extends JpaRepository<UserAccount, UUID> {
  
}
