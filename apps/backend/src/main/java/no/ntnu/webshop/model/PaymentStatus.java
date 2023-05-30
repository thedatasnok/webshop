package no.ntnu.webshop.model;

public enum PaymentStatus {
  NEW,
  IN_PROGRESS,
  PAID,
  CANCELLED;

  /**
   * Returns the payment status with the given name. The name is case insensitive.
   * 
   * @param name the name of the payment status
   * 
   * @return the payment status with the given name
   */
  public static PaymentStatus fromString(
      String string
  ) {
    for (PaymentStatus status : PaymentStatus.values()) {
      if (status.name().equalsIgnoreCase(string)) {
        return status;
      }
    }

    throw new IllegalArgumentException("Could not find PaymentStatus with name: " + string);
  }
}
