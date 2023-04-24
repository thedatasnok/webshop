package no.ntnu.webshop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.category.CategoryDto;
import no.ntnu.webshop.contracts.category.CreateCategoryRequest;
import no.ntnu.webshop.model.Category;
import no.ntnu.webshop.repository.CategoryJpaRepository;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;

@Tag(name = "Categories")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {
  private final CategoryJpaRepository categoryJpaRepository;

  @Operation(summary = "Lists all categories")
  @GetMapping
  public ResponseEntity<List<CategoryDto>> findCategories() {
    return ResponseEntity.ok(this.categoryJpaRepository.findCategories());
  }

  @Operation(summary = "Creates a new category", description = "Creates a new category that products can be linked to")
  @PostMapping
  @ShopWorkerAuthorization
  public ResponseEntity<CategoryDto> createCategory(
      @Valid @RequestBody CreateCategoryRequest request
  ) {
    var createdCategory = this.categoryJpaRepository.save(
      new Category(
        request.name(),
        request.iconUrl()
      )
    );

    return ResponseEntity.ok(
      new CategoryDto(
        createdCategory.getId(),
        createdCategory.getName(),
        createdCategory.getIconUrl()
      )
    );
  }
}
