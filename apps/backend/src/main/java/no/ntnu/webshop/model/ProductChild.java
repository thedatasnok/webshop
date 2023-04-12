package no.ntnu.webshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Join table between Product and Product. Represents a child of a product, and contains the
 * quantity of that product in the parent.
 * 
 * @see Product
 * @see ProductChildId
 */
@Entity
@Getter
@NoArgsConstructor
@IdClass(ProductChildId.class)
@Table(name = ProductChild.TABLE_NAME)
public class ProductChild {

  public static final String TABLE_NAME = "product_child";

  @Id
  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_parent_id", referencedColumnName = Product.PRIMARY_KEY)
  private Product parent;

  @Id
  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_child_id", referencedColumnName = Product.PRIMARY_KEY)
  private Product child;

  @Setter
  @Column(name = "quantity")
  private Integer quantity;

  /**
   * Creates a new product child.
   * 
   * @param parent
   * @param child
   * @param quantity
   */
  public ProductChild(
      Product parent,
      Product child,
      Integer quantity
  ) {
    this.parent = parent;
    this.child = child;
    this.quantity = quantity;
  }

}
