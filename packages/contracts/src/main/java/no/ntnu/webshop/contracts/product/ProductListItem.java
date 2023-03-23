package no.ntnu.webshop.contracts.product;

import java.util.List;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record ProductListItem(
  Long id,
  String name,
  String shortDescription,
  List<String> imageUrls,
  Double price,
  Boolean isDiscount,
  Double previousPrice
) {}
