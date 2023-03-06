package no.ntnu.webshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Join table between Product and Item. Represents the quantity of a item in a specific product.
 * 
 * @see Item
 * @see Product
 * @see ProductItemId
 */
@Entity
@Getter
@NoArgsConstructor
@IdClass(ProductItemId.class)
@Table(name = ProductItem.TABLE_NAME)
public class ProductItem {

  public static final String TABLE_NAME = "product_item";

  @Id
  private Long productId;

  @Id
  private Long itemId;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @PrimaryKeyJoinColumn(name = "fk_product_id", referencedColumnName = Product.PRIMARY_KEY)
  private Product product;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @PrimaryKeyJoinColumn(name = "fk_item_id", referencedColumnName = Item.PRIMARY_KEY)
  private Item item;

  @Setter
  @Column(name = "quantity")
  private Integer quantity;

  /**
   * Creates a new product item.
   * 
   * @param product  the product the item is in
   * @param item     the item in the product
   * @param quantity the quantity of the item in the product
   */
  public ProductItem(
      Product product,
      Item item,
      Integer quantity
  ) {
    this.product = product;
    this.item = item;
    this.quantity = quantity;
  }

}
