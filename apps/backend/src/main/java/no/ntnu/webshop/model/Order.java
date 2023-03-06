package no.ntnu.webshop.model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Represents an order in the database.
 * 
 * @see UserAccount
 * @see OrderLine
 * @see OrderStatus
 * @see PaymentMethod
 * @see PaymentStatus
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = Order.TABLE_NAME)
public class Order {
  
  public static final String TABLE_NAME = "order";
  public static final String PRIMARY_KEY = "order_id";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = Order.PRIMARY_KEY)
  private Long id;

  @Column(name = "total")
  private Double subtotal;

  @CreationTimestamp
  @Column(name = "ordered_at")
  private Date orderedAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_customer_id", referencedColumnName = UserAccount.PRIMARY_KEY)
  private UserAccount customer;

  @Column(name = "customer_name")
  private String customerName;

  @Embedded
  @AttributeOverrides({
    @AttributeOverride(name = "country", column = @Column(name = "delivery_country")),
    @AttributeOverride(name = "postalCode", column = @Column(name = "delivery_postal_code")),
    @AttributeOverride(name = "city", column = @Column(name = "delivery_city")),
    @AttributeOverride(name = "street", column = @Column(name = "delivery_street")),
    @AttributeOverride(name = "careOf", column = @Column(name = "delivery_care_of"))
  })
  private Address deliveryAddress;

  @Embedded
  @AttributeOverrides({
    @AttributeOverride(name = "country", column = @Column(name = "invoice_country")),
    @AttributeOverride(name = "postalCode", column = @Column(name = "invoice_postal_code")),
    @AttributeOverride(name = "city", column = @Column(name = "invoice_city")),
    @AttributeOverride(name = "street", column = @Column(name = "invoice_street")),
    @AttributeOverride(name = "careOf", column = @Column(name = "invoice_care_of"))
  })
  private Address invoiceAddress;

  @Column(name = "order_status")
  @Enumerated(EnumType.STRING)
  private OrderStatus orderStatus;

  @Column(name = "payment_status")
  @Enumerated(EnumType.STRING)
  private PaymentStatus paymentStatus;

  @Column(name = "payment_method")
  @Enumerated(EnumType.STRING)
  private PaymentMethod paymentMethod;
}
