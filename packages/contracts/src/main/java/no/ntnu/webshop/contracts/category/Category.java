package no.ntnu.webshop.contracts.category;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record Category(Integer id, String name) {}
