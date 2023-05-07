package no.ntnu.webshop.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.productfamily.CreateProductFamilyRequest;
import no.ntnu.webshop.contracts.productfamily.ProductFamilyListItem;
import no.ntnu.webshop.model.ProductFamily;
import no.ntnu.webshop.repository.ProductFamilyJpaRepository;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;

/**
 * Controller responsible for endpoints that do operations on the product families collection.
 * 
 * @see ProductFamily
 */
@Tag(name = "Product Families", description = "Operations on the collection of product families")
@RestController
@ShopWorkerAuthorization
@RequiredArgsConstructor
@RequestMapping("/api/v1/product-families")
public class ProductFamilyController {
  private final ProductFamilyJpaRepository productFamilyJpaRepository;

  @Operation(summary = "Finds a list of product families with optional filters")
  @GetMapping
  public ResponseEntity<List<ProductFamilyListItem>> findProductFamilies(
      @RequestParam(name = "name", required = false) Optional<String> name
  ) {
    return ResponseEntity.ok(this.productFamilyJpaRepository.findFamilies(name));
  }

  @Operation(summary = "Creates a new product family")
  @PostMapping
  public ResponseEntity<Object> createProductFamily(
      @Valid @RequestBody CreateProductFamilyRequest request
  ) {
    var family = new ProductFamily(
      request.name(),
      request.description(),
      request.sharedAttributes(),
      request.attributeMap()
    );

    var savedFamily = this.productFamilyJpaRepository.save(family);

    return ResponseEntity.created(URI.create("/api/v1/product-families/" + savedFamily.getId())).build();
  }

}
