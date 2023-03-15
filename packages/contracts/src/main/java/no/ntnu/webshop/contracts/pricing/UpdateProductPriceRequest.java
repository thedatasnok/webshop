package no.ntnu.webshop.contracts.pricing;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record UpdateProductPriceRequest(Boolean isDiscount, Double price) {}
