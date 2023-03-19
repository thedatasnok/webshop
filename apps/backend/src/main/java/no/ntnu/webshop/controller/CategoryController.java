package no.ntnu.webshop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.category.CategoryDto;
import no.ntnu.webshop.repository.CategoryJpaRepository;

@Tag(name = "Categories")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {
  private final CategoryJpaRepository categoryJpaRepository;

  @GetMapping
  public ResponseEntity<List<CategoryDto>> findCategories() {
    return ResponseEntity.ok(this.categoryJpaRepository.findCategories());
  }
}
