package no.ntnu.webshop.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.pricing.UpdateProductPriceRequest;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.contracts.product.ProductDetails;
import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.error.model.FileUploadException;
import no.ntnu.webshop.error.model.ProductNotFoundException;
import no.ntnu.webshop.model.ProductPrice;
import no.ntnu.webshop.repository.ProductJdbcRepository;
import no.ntnu.webshop.repository.ProductJpaRepository;
import no.ntnu.webshop.repository.ProductPriceJpaRepository;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;
import no.ntnu.webshop.service.ProductService;

@Tag(name = "Products")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {
  private final ProductJpaRepository productJpaRepository;
  private final ProductJdbcRepository productJdbcRepository;
  private final ProductPriceJpaRepository productPriceJpaRepository;
  private final ProductService productService;
  private final ObjectMapper objectMapper;

  @Operation(summary = "Finds a list of products with optional filters")
  @GetMapping
  public ResponseEntity<List<ProductListItem>> findProducts(
      @Parameter(
        description = "The ids of the products to find. If empty, no products will be returned unless allowEmptyIdList is set to true."
      ) @RequestParam(value = "id", required = false) List<Long> ids,
      @Parameter(description = "The name of the products to find, can be partial case insensitive match.")
      @RequestParam(value = "name", required = false) Optional<String> name,
      @Parameter(description = "A list of categories the products should be associated with")
      @RequestParam(value = "categoryId", required = false) List<Integer> category,
      @Parameter(description = "If true, the query will return products without being passed a list of ids.")
      @RequestParam(value = "allowEmptyIdList", required = false) Optional<Boolean> allowEmptyIdList,
      @Parameter(description = "The column to sort by, can be id, name, price or discount")
      @RequestParam(value = "sortBy", required = false) Optional<String> sortBy,
      @Parameter(description = "The direction to sort by, can be asc or desc")
      @RequestParam(value = "sortDirection", required = false) Optional<Direction> sortDirection
  ) {
    var allowEmptyIds = allowEmptyIdList.orElse(true);

    // maps the sortBy parameter to the correct column name in the query
    // if the parameter is not recognized, the default is to sort by id, could also throw an exception
    // if that is more suited
    var column = switch (sortBy.orElse("id").toLowerCase()) {
      case "name" -> "p.name";
      case "price" -> "pp.price";
      case "discount" -> "pp.isDiscount";
      default -> "p.id";
    };

    var sort = Sort.by(sortDirection.orElse(Direction.ASC), column);

    return ResponseEntity.ok(this.productJpaRepository.findProducts(ids, name, category, allowEmptyIds, sort));
  }

  @Operation(summary = "Finds a list of featured products")
  @GetMapping("/featured")
  public ResponseEntity<List<ProductListItem>> findFeaturedProducts() {
    return ResponseEntity.ok(this.productJpaRepository.findFeaturedProducts());
  }

  @Operation(summary = "Finds a product by its id")
  @GetMapping("/{id}")
  public ResponseEntity<ProductDetails> findProductById(
      @PathVariable Long id
  ) {
    if (!this.productJpaRepository.existsById(id))
      throw new ProductNotFoundException("Could not find product with id: " + id);

    return ResponseEntity.ok(this.productJdbcRepository.findById(id));
  }

  @Operation(summary = "Finds a list of related products by a given products id")
  @GetMapping("/{id}/related")
  public ResponseEntity<List<ProductListItem>> findRelatedProducts(
      @PathVariable Long id
  ) {
    if (!this.productJpaRepository.existsById(id))
      throw new ProductNotFoundException("Cannot find related products for non a existing product");

    return ResponseEntity.ok(this.productJpaRepository.findRelatedProducts(id));
  }

  @Operation(summary = "Creates a new product")
  @PostMapping
  @ShopWorkerAuthorization
  public ResponseEntity<ProductDetails> createProduct(
      @Valid @RequestBody CreateProductRequest request
  ) {
    var savedProduct = this.productService.createProduct(request);

    return ResponseEntity.ok(this.productJdbcRepository.findById(savedProduct.getId()));
  }

  @Operation(summary = "Creates a product with a set image")
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @ShopWorkerAuthorization
  public ResponseEntity<ProductDetails> createProduct(
      @RequestParam("product") String productString,
      @RequestParam MultipartFile image
  ) {
    try {
      // deserialize string - would otherwise have to create a custom converter class, it's a one off
      // so this is fine for now
      var product = this.objectMapper.readValue(productString, CreateProductRequest.class);
      var savedProduct = this.productService.createProduct(product, image);
      return ResponseEntity.ok(this.productJdbcRepository.findById(savedProduct.getId()));
    } catch (IOException e) {
      throw new FileUploadException("Failed to upload file either due to deserialization or file uploading");
    }
  }

  @Operation(summary = "Updates the price of a product")
  @ShopWorkerAuthorization
  @PutMapping("/{id}/price")
  public ResponseEntity<ProductDetails> updateProductPrice(
      @PathVariable("id") Long productId,
      @RequestBody UpdateProductPriceRequest request
  ) {
    var product = this.productJpaRepository.findById(productId)
      .orElseThrow(() -> new ProductNotFoundException("Could not find product with id: " + productId));

    var currentPrice = this.productPriceJpaRepository.findCurrentPriceByProductId(product.getId());

    var newPrice = new ProductPrice(
      product,
      request.price(),
      request.isDiscount()
    );

    currentPrice.end();
    newPrice.setFrom(currentPrice.getTo());

    this.productPriceJpaRepository.saveAll(List.of(currentPrice, newPrice));

    return ResponseEntity.ok(this.productJdbcRepository.findById(productId));
  }

  @Operation(summary = "Deletes a product from the system")
  @DeleteMapping("/{id}")
  @ShopWorkerAuthorization
  public ResponseEntity<Object> deleteProduct(
      @PathVariable Long id,
      @Parameter(description = "If true, the product will be forcefully deleted along with it's references")
      @RequestParam(value = "force", required = false) Optional<Boolean> force
  ) {
    if (!this.productJpaRepository.existsById(id))
      throw new ProductNotFoundException("Could not find product to delete with id: " + id);

    if (force.orElse(false)) {
      this.productPriceJpaRepository.deleteAllByProductId(id);
      this.productJpaRepository.deleteById(id);
      return ResponseEntity.ok(null);
    }

    this.productJpaRepository.deleteById(id);

    return ResponseEntity.noContent().build();
  }

}
