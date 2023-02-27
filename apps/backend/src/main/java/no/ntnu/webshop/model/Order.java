package no.ntnu.webshop.model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
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

  @Column(name = "delivery_country")
  private String deliveryCountry;

  @Column(name = "delivery_postal_code")
  private String deliveryPostalCode;

  @Column(name = "delivery_city")
  private String deliveryCity;

  @Column(name = "delivery_street")
  private String deliveryStreet;

  @Column(name = "delivery_care_of")
  private String deliveryCareOf;

  @Column(name = "invoice_country")
  private String invoiceCountry;

  @Column(name = "invoice_postal_code")
  private String invoicePostalCode;

  @Column(name = "invoice_city")
  private String invoiceCity;

  @Column(name = "invoice_street")
  private String invoiceStreet;

  @Column(name = "invoice_care_of")
  private String invoiceCareOf;

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
