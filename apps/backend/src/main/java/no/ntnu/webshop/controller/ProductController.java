package no.ntnu.webshop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.repository.ProductJpaRepository;

@Tag(name = "Products")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

  private final ProductJpaRepository productJpaRepository;

  @GetMapping
  public ResponseEntity<List<ProductListItem>> findProducts() {
    return ResponseEntity.ok(productJpaRepository.findProducts());    
  }


  
}
