package no.ntnu.webshop.contracts.order;

import java.util.Date;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record OrderListItem(
  Long id,
  Date orderedAt,
  String customerName,
  String customerEmail,
  String orderStatus,
  String paymentMethod,
  String shippingMethod,
  Double total,
  Long numberOfLines
) {}
