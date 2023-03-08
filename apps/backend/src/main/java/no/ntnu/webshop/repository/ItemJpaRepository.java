package no.ntnu.webshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.webshop.model.Item;

public interface ItemJpaRepository extends JpaRepository<Item, Long> {}
