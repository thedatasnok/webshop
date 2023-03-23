package no.ntnu.webshop.model;

public enum PaymentMethod {
  BIOMETRIC,
  CRYPTO,
  VIRTUAL_WALLET,
  SMART_CONTRACT,
  CREDIT_CARD;

  /**
   * Returns the payment method with the given name. The name is case insensitive.
   * 
   * @param name the name of the payment method
   * 
   * @return the payment method with the given name
   */
  public static PaymentMethod fromString(
      String name
  ) {
    for (PaymentMethod paymentMethod : PaymentMethod.values()) {
      if (paymentMethod.name().equalsIgnoreCase(name)) {
        return paymentMethod;
      }
    }

    throw new IllegalArgumentException("No payment method with name " + name + " found");
  }
}
