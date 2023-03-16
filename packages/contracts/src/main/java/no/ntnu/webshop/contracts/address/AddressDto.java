package no.ntnu.webshop.contracts.address;

import jakarta.validation.constraints.NotBlank;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

/**
 * Represents a DTO version of the address. Can be re-used in both requests and responses as the
 * data format will mostly be the same in both cases.
 */
@GenerateTypeScript
public record AddressDto(
  @NotBlank String country,
  @NotBlank String postalCode,
  @NotBlank String city,
  @NotBlank String street,
  String careOf
) {}
