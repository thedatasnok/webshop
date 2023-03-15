package no.ntnu.webshop.model;

import java.util.Date;

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
import lombok.Setter;

/**
 * Represents the price of a product.
 * 
 * @see OrderLine
 * @see Product
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = ProductPrice.TABLE_NAME)
public class ProductPrice {

  public static final String TABLE_NAME = "product_price";
  public static final String PRIMARY_KEY = "product_price_id";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = ProductPrice.PRIMARY_KEY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "fk_product_id", referencedColumnName = Product.PRIMARY_KEY)
  private Product product;

  @Column(name = "price")
  private Double price;

  @Setter
  @Column(name = "is_discount")
  private Boolean isDiscount;

  @Setter
  @Column(name = "time_from")
  private Date from;

  @Column(name = "time_to")
  private Date to;

  /**
   * Creates a new product price. The from date is set to the current time.
   * 
   * @param product    the product the price is for
   * @param price      the price of the product
   * @param isDiscount whether the price is a discount or not
   */
  public ProductPrice(
      Product product,
      Double price,
      boolean isDiscount
  ) {
    this.product = product;
    this.price = price;
    this.isDiscount = isDiscount;
    this.from = new Date();
  }

  /**
   * Sets the end date of the price to the current time. Effectively ending the price.
   */
  public void end() {
    this.to = new Date();
  }

}
