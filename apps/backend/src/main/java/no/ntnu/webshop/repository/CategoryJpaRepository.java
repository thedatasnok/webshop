package no.ntnu.webshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import no.ntnu.webshop.contracts.category.CategoryDto;
import no.ntnu.webshop.model.Category;

public interface CategoryJpaRepository extends JpaRepository<Category, Integer> {

  /**
   * Finds all categories and returns them in a list of CategoryDto objects.
   * 
   * @return all categories
   */
  @Query("""
    SELECT new no.ntnu.webshop.contracts.category.CategoryDto(
      category.id,
      category.name,
      category.iconUrl
    )
    FROM Category category
    """)
  List<CategoryDto> findCategories();

  /**
   * Finds all categories with the given ids and returns them in a list of Category entities. It will
   * also fetch the related products, initializing the collection.
   * 
   * @param ids the ids of the categories to find
   * 
   * @return a list of categories
   */
  @Query("SELECT c FROM Category c LEFT JOIN FETCH c.products WHERE c.id IN :ids")
  List<Category> findAllByIdWithProducts(
      @Param("ids") Iterable<Integer> ids
  );

}
