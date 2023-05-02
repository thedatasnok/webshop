package no.ntnu.webshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import no.ntnu.webshop.model.Product;
import no.ntnu.webshop.model.ProductChild;
import no.ntnu.webshop.model.ProductChildId;

public interface ProductChildJpaRepository extends JpaRepository<ProductChild, ProductChildId> {

  /**
   * Deletes all product children by its parent.
   * 
   * @param parent the parent to delete all product children by
   */
  @Transactional
  void deleteAllByParent(
      Product parent
  );

}
