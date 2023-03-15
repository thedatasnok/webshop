package no.ntnu.webshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.model.Product;

public interface ProductJpaRepository extends JpaRepository<Product, Long> {

  @Query("""
    SELECT new no.ntnu.webshop.contracts.product.ProductListItem(
      p.id,
      p.name,
      p.imageUrls,
      pp.price,
      pp.isDiscount,
      prev_pp.price
    )
    FROM Product p
    INNER JOIN ProductPrice pp
      ON pp.product = p
      AND pp.from <= NOW()
      AND pp.to IS NULL
    LEFT JOIN ProductPrice prev_pp
      ON prev_pp.product = p
      AND prev_pp.to = pp.from
    """)
  List<ProductListItem> findProducts();

}
