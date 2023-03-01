package no.ntnu.webshop.model;

/**
 * Represents a user account role in the database.
 */
public enum UserAccountRole {
  SHOP_OWNER,
  SHOP_WORKER,
  CUSTOMER;

  /**
   * Finds and returns a UserAccountRole with the given string value as name.
   * Ignores case.
   * 
   * @param value the value to find a UserAccountRole for
   * 
   * @return the UserAccountRole with the given value as name
   */
  public static UserAccountRole fromString(String value) {
    for (var role : UserAccountRole.values()) {
      if (role.name().equalsIgnoreCase(value)) {
        return role;
      }
    }

    throw new IllegalArgumentException("Could not find a UserAccountRole with value: " + value);
  }
}
