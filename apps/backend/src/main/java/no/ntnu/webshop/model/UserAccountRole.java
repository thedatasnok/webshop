package no.ntnu.webshop.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a user account role in the database.
 */
@Getter
@Entity
@NoArgsConstructor
@Table(name = UserAccountRole.TABLE_NAME)
public class UserAccountRole {
  
  public static final String TABLE_NAME = "user_account_role";
  public static final String PRIMARY_KEY = "user_account_role_id";

  @Id
  @Column(name = UserAccountRole.PRIMARY_KEY)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Integer id;

  @Setter
  @Column(name = "name", nullable = false)
  public String name;

  // not sure if this bidirectional mapping is necessary
  // but it's a decent example of how it can be done
  @OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
  private List<UserAccount> userAccounts = new ArrayList<>();

  /**
   * Creates a new user account role.
   * 
   * @param name the name of the role
   */
  public UserAccountRole(String name) {
    this.name = name;
  }

  /**
   * Adds a new user account to this role.
   * 
   * @param userAccount the user account to add to this role
   */
  public void addUserAccount(UserAccount userAccount) {
    userAccount.setRole(this); // mutates the owner side of the relationship
    this.userAccounts.add(userAccount);
  }

  /**
   * Removes a user account from this role.
   * 
   * @param userAccount the user account to remove from this role
   */
  public void removeUserAccount(UserAccount userAccount) {
    userAccount.setRole(null);
    this.userAccounts.remove(userAccount);
  }

}
