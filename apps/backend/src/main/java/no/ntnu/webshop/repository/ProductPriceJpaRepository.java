package no.ntnu.webshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.model.ProductPrice;

public interface ProductPriceJpaRepository extends JpaRepository<ProductPrice, Long> {
  
  @Query("""
    SELECT pp
    FROM ProductPrice pp
    WHERE pp.product.id = :productId
      AND pp.from <= NOW()
      AND pp.to IS NULL
  """)
  ProductPrice findCurrentPriceByProductId(@Param("productId") Long productId);

}
