package no.ntnu.webshop.contracts.order;

import java.util.Map;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import no.ntnu.webshop.contracts.address.AddressDto;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record PlaceOrderRequest(
  @NotNull AddressDto shippingAddress,
  @Nullable AddressDto billingAddress,
  boolean differentBillingAddress,
  @NotNull String paymentMethod,
  @NotNull String shippingMethod,
  @Size(min = 1) Map<Long, Integer> lines
) {}
