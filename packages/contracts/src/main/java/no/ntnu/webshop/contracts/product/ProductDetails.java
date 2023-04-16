package no.ntnu.webshop.contracts.product;

import java.util.List;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record ProductDetails(
  Long id,
  String name,
  String shortDescription,
  String description,
  List<String> imageUrls,
  Double price,
  Boolean isDiscount,
  Double previousPrice,
  List<ProductChildDetails> children,
  List<ProductVariant> variants
) {}
