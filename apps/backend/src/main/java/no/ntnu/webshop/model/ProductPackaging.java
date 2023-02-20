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
 * Join table between Product and Packaging.
 * Represents the quantity of a product in a specific packaging.
 * 
 * @see Product
 * @see Packaging
 * @see ProductPackagingId
 */
@Entity
@Getter
@NoArgsConstructor
@IdClass(ProductPackagingId.class)
@Table(name = ProductPackaging.TABLE_NAME)
public class ProductPackaging {

  public static final String TABLE_NAME = "product_packaging";

  @Id
  private Long productId;

  @Id
  private Long packagingId;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @PrimaryKeyJoinColumn(name = "fk_packaging_id", referencedColumnName = Packaging.PRIMARY_KEY)
  private Packaging packaging;
  
  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @PrimaryKeyJoinColumn(name = "fk_product_id", referencedColumnName = Product.PRIMARY_KEY)
  private Product product;
  
  @Setter
  @Column(name = "quantity")
  private Integer quantity;

}
