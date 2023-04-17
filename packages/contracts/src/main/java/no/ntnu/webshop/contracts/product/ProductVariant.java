package no.ntnu.webshop.contracts.product;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record ProductVariant(Long id, String shortName) {}
