package no.ntnu.webshop.contracts.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;
import no.ntnu.webshop.contracts.utility.annotation.Nullable;

@Builder
@GenerateTypeScript
public record ProductDetails(
  Long id,
  String name,
  String shortDescription,
  String description,
  List<String> imageUrls,
  BigDecimal price,
  Boolean isDiscount,
  @Nullable BigDecimal previousPrice,
  Map<String, Map<String, String>> attributes,
  List<ProductChildDetails> children,
  List<ProductVariant> variants
) {}
