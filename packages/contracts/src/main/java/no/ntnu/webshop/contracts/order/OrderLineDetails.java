package no.ntnu.webshop.contracts.order;

import java.util.List;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record OrderLineDetails(
  Long id,
  Long productId,
  String productName,
  String productShortDescription,
  List<String> productImageUrls,
  Integer quantity,
  Boolean wasDiscount,
  Double previousUnitPrice,
  Double unitPrice,
  Double subtotal
) {}
