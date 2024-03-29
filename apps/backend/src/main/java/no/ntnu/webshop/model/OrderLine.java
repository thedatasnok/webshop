package no.ntnu.webshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Represents the products in an order.
 * 
 * @see Order
 * @see Product
 * @see ProductPrice
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = OrderLine.TABLE_NAME)
public class OrderLine {

  public static final String TABLE_NAME = "order_line";
  public static final String PRIMARY_KEY = "order_line_id";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = OrderLine.PRIMARY_KEY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "fk_order_id", referencedColumnName = Order.PRIMARY_KEY)
  private Order order;

  @ManyToOne
  @JoinColumn(name = "fk_product_id", referencedColumnName = Product.PRIMARY_KEY)
  private Product product;

  @ManyToOne
  @JoinColumn(name = "fk_product_price_id", referencedColumnName = ProductPrice.PRIMARY_KEY)
  private ProductPrice productPrice;

  @Column(name = "quantity")
  private Integer quantity;

  @Column(name = "subtotal")
  private Double subtotal;

  /**
   * Creates a new order line.
   * 
   * @param order        the order the product is in
   * @param product      the product in the order
   * @param productPrice the price of the product
   * @param quantity     the quantity of the product
   */
  public OrderLine(
      Order order,
      Product product,
      ProductPrice productPrice,
      Integer quantity
  ) {
    this.order = order;
    this.product = product;
    this.productPrice = productPrice;
    this.quantity = quantity;
    this.subtotal = this.productPrice.getPrice() * this.quantity;
  }

}
