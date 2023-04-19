package no.ntnu.webshop.contracts;

import java.util.List;
import java.util.Map;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record ValidationErrorResponse(int statusCode, String code, Map<String, List<ValidationError>> errors) {}
