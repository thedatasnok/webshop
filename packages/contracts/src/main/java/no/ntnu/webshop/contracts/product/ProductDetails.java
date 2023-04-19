package no.ntnu.webshop.contracts.product;

import java.util.List;
import java.util.Map;

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
  Map<String, Map<String, String>> attributes,
  List<ProductChildDetails> children,
  List<ProductVariant> variants
) {}
