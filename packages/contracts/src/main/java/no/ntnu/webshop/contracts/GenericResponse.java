package no.ntnu.webshop.contracts;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record GenericResponse(String message) {}
