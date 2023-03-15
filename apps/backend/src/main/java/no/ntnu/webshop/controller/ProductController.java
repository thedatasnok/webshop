package no.ntnu.webshop.controller;

import java.util.List;
import java.util.Optional;

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
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.pricing.UpdateProductPriceRequest;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.contracts.product.ProductDetails;
import no.ntnu.webshop.contracts.product.ProductItemDetails;
import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.model.Product;
import no.ntnu.webshop.model.ProductItem;
import no.ntnu.webshop.model.ProductPrice;
import no.ntnu.webshop.repository.ItemJpaRepository;
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
  private final ItemJpaRepository itemJpaRepository;

  @Operation(summary = "Finds a list of products with optional filters")
  @GetMapping
  public ResponseEntity<List<ProductListItem>> findProducts(
      @RequestParam(value = "id", required = false) List<Long> ids,
      @RequestParam(value = "name", required = false) Optional<String> name,
      @RequestParam(value = "categoryId", required = false) List<Integer> category,
      @RequestParam(value = "allowEmptyIdList", required = false) Optional<Boolean> allowEmptyIdList
  ) {
    var allowEmptyIds = allowEmptyIdList.orElse(true);

    return ResponseEntity.ok(this.productJpaRepository.findProducts(ids, name, category, allowEmptyIds));
  }

  @Operation(summary = "Finds a product by its id")
  @GetMapping("/{id}")
  public ResponseEntity<ProductDetails> findProductById(
      @PathVariable Long id
  ) {
    if (!this.productJpaRepository.existsById(id))
      return ResponseEntity.notFound().build();

    return ResponseEntity.ok(this.productJdbcRepository.findById(id));
  }

  @Operation(summary = "Creates a new product")
  @PostMapping
  @ShopWorkerAuthorization
  public ResponseEntity<ProductDetails> createProduct(
      @Valid @RequestBody CreateProductRequest request
  ) {
    var product = new Product(
      request.name(),
      request.description(),
      request.imageUrls()
    );

    var price = new ProductPrice(
      product,
      request.price(),
      request.isDiscount()
    );

    product.addPrice(price);

    var itemIds = request.items().keySet();
    var items = this.itemJpaRepository.findAllById(itemIds);

    // adds the items to the product
    for (var item : items) {
      product.addItem(
        new ProductItem(
          product,
          item,
          request.items().get(item.getId())
        )
      );
    }

    var savedProduct = this.productJpaRepository.save(product);

    // maps the product items into the contract
    var itemDetails = savedProduct.getItems()
      .stream()
      .map(
        productItem -> ProductItemDetails.builder()
          .id(productItem.getItem().getId())
          .quantity(productItem.getQuantity())
          .name(productItem.getItem().getName())
          .description(productItem.getItem().getDescription())
          .attributes(productItem.getItem().getAttributes())
          .build()
      )
      .toList();

    return ResponseEntity.ok(
      ProductDetails.builder()
        .id(savedProduct.getId())
        .name(savedProduct.getName())
        .imageUrls(savedProduct.getImageUrls())
        .price(price.getPrice())
        .isDiscount(price.getIsDiscount())
        .items(itemDetails)
        .build()
    );
  }

  @Operation(summary = "Updates the price of a product")
  @ShopWorkerAuthorization
  @PutMapping("/{id}/price")
  public ResponseEntity<String> updateProductPrice(
      @PathVariable("id") Long productId,
      @RequestBody UpdateProductPriceRequest request
  ) {
    var product = this.productJpaRepository.findById(productId).orElseThrow(IllegalArgumentException::new);

    var currentPrice = this.productPriceJpaRepository.findCurrentPriceByProductId(product.getId());

    var newPrice = new ProductPrice(
      product,
      request.price(),
      request.isDiscount()
    );

    currentPrice.end();
    newPrice.setFrom(currentPrice.getTo());

    this.productPriceJpaRepository.saveAll(List.of(currentPrice, newPrice));

    return ResponseEntity.ok("Successfully updated the price of the product wehoo");
  }

}
