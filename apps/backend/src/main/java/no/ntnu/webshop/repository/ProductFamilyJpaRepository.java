package no.ntnu.webshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.contracts.productfamily.ProductFamilyListItem;
import no.ntnu.webshop.model.ProductFamily;

public interface ProductFamilyJpaRepository extends JpaRepository<ProductFamily, Long> {

  /**
   * Finds a list of product families based on the given parameters.
   * 
   * @param name the name to search for, if null no filtering will be done
   * 
   * @return a list of product families matching the input parameters
   */
  @Query("""
      SELECT new no.ntnu.webshop.contracts.productfamily.ProductFamilyListItem(
        pf.id,
        pf.name,
        pf.description,
        pf.sharedAttributes,
        pf.attributeMap,
        COUNT(p.id)
      )
      FROM ProductFamily pf
      LEFT JOIN pf.products p
      WHERE
        (:name IS NULL OR pf.name ILIKE %:name%)
      GROUP BY pf.id
    """)
  List<ProductFamilyListItem> findFamilies(
      @Param("name") Optional<String> name
  );

}
