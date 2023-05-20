package no.ntnu.webshop.utility;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.EnumType;

import no.ntnu.webshop.model.OrderStatus;
import no.ntnu.webshop.model.PaymentMethod;
import no.ntnu.webshop.model.PaymentStatus;
import no.ntnu.webshop.model.ShippingMethod;
import no.ntnu.webshop.model.UserAccountRole;

/**
 * A collection of custom enum types that can be used with the @Type annotation.
 */
public class EnumTypes {

  private EnumTypes() {}

  /**
   * Custom enum type that maps enums to PostgreSQL enums. By default Hibernate maps enums to VARCHAR,
   * which would cause exceptions on insert.
   */
  // TODO: Find and alternative way to handle this conversion from the PostgreSQL enum type to the Java one.
  private static class CustomEnumType<T extends Enum<T>> extends EnumType<T> {
    @Override
    public void nullSafeSet(
        PreparedStatement st,
        T value,
        int index,
        SharedSessionContractImplementor session
    ) throws HibernateException, SQLException {
      if (value == null) {
        st.setNull(index, Types.OTHER);
      } else {
        st.setObject(index, value.name(), Types.OTHER);
      }
    }
  }

  // Classes that can be used with the @Type annotation in Hibernate below.
  // Each of these are tied to a specific enum type in the model package.

  public static final class UserAccountRoleEnumType extends CustomEnumType<UserAccountRole> {}

  public static final class OrderStatusEnumType extends CustomEnumType<OrderStatus> {}

  public static final class PaymentStatusEnumType extends CustomEnumType<PaymentStatus> {}

  public static final class PaymentMethodEnumType extends CustomEnumType<PaymentMethod> {}

  public static final class ShippingMethodEnumType extends CustomEnumType<ShippingMethod> {}

}
