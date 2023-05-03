package no.ntnu.webshop.service;

import java.io.IOException;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.error.model.CategoryNotFoundException;
import no.ntnu.webshop.error.model.InternalValidationException;
import no.ntnu.webshop.error.model.ProductNotFoundException;
import no.ntnu.webshop.model.Product;
import no.ntnu.webshop.model.ProductChild;
import no.ntnu.webshop.model.ProductFamily;
import no.ntnu.webshop.model.ProductPrice;
import no.ntnu.webshop.repository.CategoryJpaRepository;
import no.ntnu.webshop.repository.ProductChildJpaRepository;
import no.ntnu.webshop.repository.ProductFamilyJpaRepository;
import no.ntnu.webshop.repository.ProductJpaRepository;
import no.ntnu.webshop.repository.ProductPriceJpaRepository;
import no.ntnu.webshop.service.FileService.FileCategory;

@Service
@RequiredArgsConstructor
public class ProductService {
  private final ProductJpaRepository productJpaRepository;
  private final ProductFamilyJpaRepository productFamilyJpaRepository;
  private final ProductPriceJpaRepository productPriceJpaRepository;
  private final ProductChildJpaRepository productChildJpaRepository;
  private final CategoryJpaRepository categoryJpaRepository;
  private final FileService fileService;
  private final Validator validator;

  /**
   * Creates a new product.
   * 
   * @param request the request to create a new product
   * 
   * @return the created product
   */
  public Product createProduct(
      CreateProductRequest request
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

    return this.productJpaRepository.save(product);
  }

  /**
   * Creates a new product with an image.
   * 
   * @param request the request to create a new product
   * @param file    the image to upload to S3
   * 
   * @return the created product
   * 
   * @throws IOException if the file could not be uploaded
   */
  public Product createProduct(
      CreateProductRequest request,
      MultipartFile file
  ) throws IOException {
    var url = this.fileService.uploadFile(file, FileCategory.PRODUCT);

    // only process if not null to avoid nullpointer exception
    if (request.imageUrls() != null) {
      request.imageUrls().clear();
      request.imageUrls().add(url);
    }

    Set<ConstraintViolation<Object>> violations = this.validator.validate(request);

    if (!violations.isEmpty()) {
      throw new InternalValidationException(violations);
    }

    return this.createProduct(request);
  }

  /**
   * Deletes a product and optionally its related entities. Deletion will fail if the product is
   * referenced to by order lines.
   * 
   * @param productId the id of the product to delete
   * @param force     whether to delete related entities or not, namely its prices and child
   *                  references
   */
  public void deleteProductById(
      Long productId,
      boolean force
  ) {
    if (force) {
      this.productChildJpaRepository.deleteAllByParentId(productId);
      this.productPriceJpaRepository.deleteAllByProductId(productId);
    }

    this.productJpaRepository.deleteById(productId);
  }

}
