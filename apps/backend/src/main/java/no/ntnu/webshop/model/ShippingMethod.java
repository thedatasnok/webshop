package no.ntnu.webshop.model;

public enum ShippingMethod {
  INSTANT_TELEPORTATION,
  DRONE,
  SELF_DRIVING_TRUCK,
  HYPERLOOP;

  /**
   * Returns the shipping method with the given name. The name is case insensitive.
   * 
   * @param name the name of the shipping method
   * 
   * @return the shipping method with the given name
   */
  public static ShippingMethod fromString(
      String name
  ) {
    for (ShippingMethod shippingMethod : ShippingMethod.values()) {
      if (shippingMethod.name().equalsIgnoreCase(name)) {
        return shippingMethod;
      }
    }

    throw new IllegalArgumentException("No shipping method with name " + name + " found");
  }
}
