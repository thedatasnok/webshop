package no.ntnu.webshop.model;

import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * Represents a user account in the database.
 * Note that the id cannot be set manually, as it should be generated by the database.
 */
@Getter
@Entity
@Table(name = UserAccount.TABLE_NAME)
public class UserAccount {
  
  public static final String TABLE_NAME = "user_account";
  public static final String PRIMARY_KEY = "user_account_id";

  @Id
  @Column(name = UserAccount.PRIMARY_KEY)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private UUID id;

  @Setter
  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Setter
  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Setter
  @Column(name = "password", nullable = false)
  private String password;

  @Setter
  @Column(name = "email_verified", nullable = false)
  private boolean emailVerified;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(
    name = "fk_user_account_role_id", 
    referencedColumnName = UserAccountRole.PRIMARY_KEY
  )
  private UserAccountRole role;

  @CreationTimestamp
  @Column(name = "created_at")
  private Date createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Date updatedAt;

  /**
   * Creates a new instance of a user account.
   * 
   * @param fullName the full name of the user
   * @param email the email of the user, this will also be their user name
   * @param password the password of the user as a hashed string
   * @param role the role of the user
   */
  public UserAccount(
      String fullName,
      String email,
      String password,
      UserAccountRole role
  ) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

}
