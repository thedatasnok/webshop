package no.ntnu.webshop.contracts.order;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record UpdateOrderRequest(String orderStatus, String paymentStatus) {}
