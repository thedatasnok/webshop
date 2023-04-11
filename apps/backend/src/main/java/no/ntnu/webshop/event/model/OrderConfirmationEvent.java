package no.ntnu.webshop.event.model;

import no.ntnu.webshop.model.UserAccount;

public record OrderConfirmationEvent(UserAccount customer, Long orderId) {}
