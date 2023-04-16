package no.ntnu.webshop.contracts.productfamily;

import java.util.Map;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record CreateProductFamilyRequest(
  @NotBlank String name,
  @NotNull String description,
  @NotNull Map<String, String> sharedAttributes,
  @NotNull Map<String, Set<String>> attributeMap
) {}
