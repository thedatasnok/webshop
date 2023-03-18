package no.ntnu.webshop.contracts.address;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

/**
 * Represents a DTO version of the address. Can be re-used in both requests and responses as the
 * data format will mostly be the same in both cases.
 */
@GenerateTypeScript
public record AddressDto(
  @Schema(example = "Norway") @NotBlank String country,
  @Schema(example = "6009") @NotBlank String postalCode,
  @Schema(example = "Ålesund") @NotBlank String city,
  @Schema(example = "Larsgårdsvegen 2") @NotBlank String street,
  @Schema(example = "Bob") String careOf
) {}
