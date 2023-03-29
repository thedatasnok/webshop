package no.ntnu.webshop.contracts.category;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record CategoryDto(Integer id, String name, String iconUrl) {}
