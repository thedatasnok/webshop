package no.ntnu.webshop.model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import jakarta.persistence.AttributeOverride;
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
import no.ntnu.webshop.utility.EnumTypes.OrderStatusEnumType;
import no.ntnu.webshop.utility.EnumTypes.PaymentMethodEnumType;
import no.ntnu.webshop.utility.EnumTypes.PaymentStatusEnumType;

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

  @CreationTimestamp
  @Column(name = "ordered_at")
  private Date orderedAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_customer_id", referencedColumnName = UserAccount.PRIMARY_KEY)
  private UserAccount customer;

  @Column(name = "customer_name")
  private String customerName;

  @Embedded
  @AttributeOverride(name = "country", column = @Column(name = "delivery_country"))
  @AttributeOverride(name = "postalCode", column = @Column(name = "delivery_postal_code"))
  @AttributeOverride(name = "city", column = @Column(name = "delivery_city"))
  @AttributeOverride(name = "street", column = @Column(name = "delivery_street"))
  @AttributeOverride(name = "careOf", column = @Column(name = "delivery_care_of"))
  private Address deliveryAddress;

  @Embedded
  @AttributeOverride(name = "country", column = @Column(name = "invoice_country"))
  @AttributeOverride(name = "postalCode", column = @Column(name = "invoice_postal_code"))
  @AttributeOverride(name = "city", column = @Column(name = "invoice_city"))
  @AttributeOverride(name = "street", column = @Column(name = "invoice_street"))
  @AttributeOverride(name = "careOf", column = @Column(name = "invoice_care_of"))
  private Address invoiceAddress;

  @Enumerated(EnumType.STRING)
  @Type(OrderStatusEnumType.class)
  @Column(name = "order_status")
  private OrderStatus orderStatus;

  @Enumerated(EnumType.STRING)
  @Type(PaymentStatusEnumType.class)
  @Column(name = "payment_status")
  private PaymentStatus paymentStatus;

  @Enumerated(EnumType.STRING)
  @Type(PaymentMethodEnumType.class)
  @Column(name = "payment_method")
  private PaymentMethod paymentMethod;

  /**
   * Creates a new order with the given parameters.
   * 
   * @param customer        the customer who placed the order
   * @param deliveryAddress the delivery address of the order
   * @param invoiceAddress  the invoice address of the order
   * @param paymentMethod   the payment method of the order
   */
  public Order(
      UserAccount customer,
      Address deliveryAddress,
      Address invoiceAddress,
      PaymentMethod paymentMethod
  ) {
    this.customer = customer;
    this.customerName = customer.getFullName();
    this.deliveryAddress = deliveryAddress;
    this.invoiceAddress = invoiceAddress;
    this.paymentMethod = paymentMethod;

    this.orderStatus = OrderStatus.NEW;
    this.paymentStatus = PaymentStatus.NEW;
  }

}
