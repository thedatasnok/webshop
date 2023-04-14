package no.ntnu.webshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.model.Product;

public interface ProductJpaRepository extends JpaRepository<Product, Long> {

  /**
   * Finds a list of products based on the given parameters.
   * 
   * @param ids              an optionally empty list of product ids, if empty none will be returned
   *                         unless specified otherwise by allowEmptyIdList
   * @param name             a name to search for, if null no filtering will be done
   * @param category         a list of category ids to search for, if null no filtering will be done
   * @param allowEmptyIdList if true, and ids is empty, all products will be returned
   * 
   * @return a list of products
   */
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

  /**
   * Finds a list of featured products, these are the 10 products that are currently on sale or have
   * recently been created.
   * 
   * @return a list of featured products
   */
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
    ORDER BY
      pp.isDiscount DESC,
      p.id DESC
    LIMIT 10
    """)
  // NOTE: the query assumes that higher ID = newer product, which is typically the case but can also
  // not be true. would have to add a created_at column in order to garuantee this
  List<ProductListItem> findFeaturedProducts();

}
