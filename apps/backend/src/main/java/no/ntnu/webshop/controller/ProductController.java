package no.ntnu.webshop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.pricing.UpdateProductPriceRequest;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.contracts.product.ProductDetails;
import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.error.model.CategoryNotFoundException;
import no.ntnu.webshop.error.model.ProductNotFoundException;
import no.ntnu.webshop.model.Product;
import no.ntnu.webshop.model.ProductChild;
import no.ntnu.webshop.model.ProductFamily;
import no.ntnu.webshop.model.ProductPrice;
import no.ntnu.webshop.repository.CategoryJpaRepository;
import no.ntnu.webshop.repository.ProductFamilyJpaRepository;
import no.ntnu.webshop.repository.ProductJdbcRepository;
import no.ntnu.webshop.repository.ProductJpaRepository;
import no.ntnu.webshop.repository.ProductPriceJpaRepository;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;

@Tag(name = "Products")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {
  private final ProductJpaRepository productJpaRepository;
  private final ProductJdbcRepository productJdbcRepository;
  private final ProductPriceJpaRepository productPriceJpaRepository;
  private final ProductFamilyJpaRepository productFamilyJpaRepository;
  private final CategoryJpaRepository categoryJpaRepository;

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
    ProductFamily family = null;

    if (request.familyId() != null) {
      family = this.productFamilyJpaRepository.findById(request.familyId())
        .orElseThrow(
          () -> new ProductNotFoundException("Could not find product family with id: " + request.familyId())
        );
    }

    var product = new Product(
      request.name(),
      request.shortName(),
      request.description(),
      request.shortDescription(),
      request.imageUrls(),
      family,
      request.attributes()
    );

    var price = new ProductPrice(
      product,
      request.price(),
      request.isDiscount()
    );

    product.addPrice(price);

    var productIds = request.children().keySet();
    var children = this.productJpaRepository.findAllById(productIds);

    if (children.size() != productIds.size())
      throw new ProductNotFoundException("One or more child products were not found");

    // adds the items to the product
    for (var child : children) {
      product.addChild(
        new ProductChild(
          product,
          child,
          request.children().get(child.getId())
        )
      );
    }

    var categories = this.categoryJpaRepository.findAllById(request.categoryIds());

    if (categories.size() != request.categoryIds().size())
      throw new CategoryNotFoundException("One or more categories were not found");

    for (var category : categories) {
      product.addCategory(category);
    }

    var savedProduct = this.productJpaRepository.save(product);

    return ResponseEntity.ok(this.productJdbcRepository.findById(savedProduct.getId()));
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

}
