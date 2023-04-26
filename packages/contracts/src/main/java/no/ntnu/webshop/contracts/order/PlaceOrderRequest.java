package no.ntnu.webshop.contracts.order;

import java.util.Map;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import no.ntnu.webshop.contracts.address.AddressDto;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record PlaceOrderRequest(
  @NotBlank String customerName,
  @NotNull AddressDto shippingAddress,
  @Nullable AddressDto billingAddress,
  boolean differentBillingAddress,
  @Schema(example = "CASH_ON_DELIVERY") @NotNull String paymentMethod,
  @Schema(example = "DRONE") @NotNull String shippingMethod,
  @Schema(description = "The quantity of products keyed by the product id.", example = """
    {
      "1": 1,
      "2": 2
    }
    """) @Size(min = 1) Map<Long, Integer> lines
) {}
