package no.ntnu.webshop.utility;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.EnumType;

import no.ntnu.webshop.model.UserAccountRole;

/**
 * This class is used to map the UserAccountRole enum to a PostgreSQL enum type.
 */
public class UserAccountRoleEnumType extends EnumType<UserAccountRole> {

  @Override
  public void nullSafeSet(
      PreparedStatement st, 
      UserAccountRole value, 
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
