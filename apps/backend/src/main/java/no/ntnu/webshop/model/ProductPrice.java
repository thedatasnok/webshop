package no.ntnu.webshop.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
  @Column(name = ProductPrice.PRIMARY_KEY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "fk_product_id", referencedColumnName = Product.PRIMARY_KEY)
  private Product product;

  @Column(name = "price")
  private Double price;

  @Column(name = "is_discount")
  private Boolean isDiscount;

  @Column(name = "from")
  private Date from;

  @Column(name = "to")
  private Date to;
}
