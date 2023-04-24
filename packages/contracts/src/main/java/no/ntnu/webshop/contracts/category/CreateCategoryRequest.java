package no.ntnu.webshop.contracts.category;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotBlank;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record CreateCategoryRequest(@NotBlank String name, @URL String iconUrl) {}
