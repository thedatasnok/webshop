package no.ntnu.webshop.contracts.productfamily;

import java.util.Map;
import java.util.Set;

public record ProductFamilyListItem(
  Long id,
  String name,
  String description,
  Map<String, Map<String, String>> sharedAttributes,
  Map<String, Map<String, Set<String>>> attributeMap,
  Long productCount
) {}
