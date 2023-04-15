package no.ntnu.webshop.contracts.order;

import java.util.Date;
import java.util.List;

import lombok.Builder;
import no.ntnu.webshop.contracts.address.AddressDto;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record OrderDetails(
  Long id,
  String customerName,
  String customerEmail,
  Date orderedAt,
  AddressDto deliveryAddress,
  AddressDto billingAddress,
  List<OrderLineDetails> lines,
  Double total,
  String status,  
  String paymentStatus,
  String paymentMethod,
  String shippingMethod
) {}
