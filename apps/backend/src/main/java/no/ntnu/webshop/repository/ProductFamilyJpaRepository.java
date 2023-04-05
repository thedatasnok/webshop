package no.ntnu.webshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.webshop.model.ProductFamily;

public interface ProductFamilyJpaRepository extends JpaRepository<ProductFamily, Long> {}
