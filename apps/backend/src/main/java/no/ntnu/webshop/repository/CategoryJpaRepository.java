package no.ntnu.webshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import no.ntnu.webshop.contracts.category.CategoryDto;
import no.ntnu.webshop.model.Category;

public interface CategoryJpaRepository extends JpaRepository<Category, Long> {

  @Query("""
    SELECT new no.ntnu.webshop.contracts.category.CategoryDto(
      category.id,
      category.name
    )
    FROM Category category
    """)
  List<CategoryDto> findCategories();

}
