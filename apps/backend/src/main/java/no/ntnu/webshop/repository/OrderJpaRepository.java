package no.ntnu.webshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.webshop.model.Order;

public interface OrderJpaRepository extends JpaRepository<Order, Long> {}
