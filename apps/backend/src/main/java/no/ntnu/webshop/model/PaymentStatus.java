package no.ntnu.webshop.model;

public enum PaymentStatus {
  NEW,
  IN_PROGRESS,
  PAID,
  CANCELLED;

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
