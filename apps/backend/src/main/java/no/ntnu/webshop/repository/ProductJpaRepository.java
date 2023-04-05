package no.ntnu.webshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.model.Product;

public interface ProductJpaRepository extends JpaRepository<Product, Long> {

  @Query("""
    SELECT new no.ntnu.webshop.contracts.product.ProductListItem(
      p.id,
      p.name,
      p.shortDescription,
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
    WHERE 
      ((COALESCE(:id) IS NULL AND :allowEmptyIdList = TRUE) OR p.id IN (:id)) AND
      (:name IS NULL OR p.name ILIKE %:name%) AND
      (COALESCE(:category) IS NULL OR p.id IN (
        SELECT DISTINCT p.id
        FROM Category c
        INNER JOIN c.products p
        WHERE c.id IN (:category)
      ))
    """)
  List<ProductListItem> findProducts(
      @Param("id") List<Long> ids,
      @Param("name") Optional<String> name,
      @Param("category") List<Integer> category,
      @Param("allowEmptyIdList") Boolean allowEmptyIdList
  );

}
