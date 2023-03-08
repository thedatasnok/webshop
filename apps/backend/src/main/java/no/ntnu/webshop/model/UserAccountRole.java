package no.ntnu.webshop.model;

/**
 * Represents a user account role in the database.
 */
public enum UserAccountRole {
  SHOP_OWNER(Code.SHOP_OWNER),
  SHOP_WORKER(Code.SHOP_WORKER),
  CUSTOMER(Code.CUSTOMER);

  private final String code;

  private UserAccountRole(
      String code
  ) {
    this.code = code;
  }

  /**
   * Returns the string code of the role.
   * 
   * @return the string code of the role
   */
  public String getCode() {
    return this.code;
  }

  public static class Code {
    public static final String SHOP_OWNER = "SHOP_OWNER";
    public static final String SHOP_WORKER = "SHOP_WORKER";
    public static final String CUSTOMER = "CUSTOMER";

    // prevents instantiation, we only need the constant values
    // to refer to them in annotations
    private Code() {}
  }
}
