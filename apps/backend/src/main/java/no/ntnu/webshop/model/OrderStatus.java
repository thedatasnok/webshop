package no.ntnu.webshop.model;

public enum OrderStatus {
  NEW,
  IN_PROGRESS,
  SHIPPED,
  DELIVERED,
  CANCELLED;

  public static OrderStatus fromString(
      String string
  ) {
    for (OrderStatus status : OrderStatus.values()) {
      if (status.name().equalsIgnoreCase(string)) {
        return status;
      }
    }

    throw new IllegalArgumentException("Could not find OrderStatus with name: " + string);
  }
}
