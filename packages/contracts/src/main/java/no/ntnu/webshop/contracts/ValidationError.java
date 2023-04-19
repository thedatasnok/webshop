package no.ntnu.webshop.contracts;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record ValidationError(String message, Object rejectedValue) {}
