package no.ntnu.webshop.repository;

import java.util.List;

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

  @Query("""
    SELECT pp
    FROM ProductPrice pp
    INNER JOIN Product p
      ON pp.product = p
    WHERE pp.product.id IN (:productId)
      AND pp.from <= NOW()
      AND pp.to IS NULL
  """)
  List<ProductPrice> findAllCurrentPricesByProductIds(@Param("productId") Iterable<Long> productId);

}
