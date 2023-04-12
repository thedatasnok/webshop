package no.ntnu.webshop.contracts.product;

import java.util.Map;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record ProductChildDetails(
  Long id,
  Integer quantity,
  String name,
  String description,
  Map<String, String> attributes
) {}
