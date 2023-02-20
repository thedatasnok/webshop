package no.ntnu.webshop.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Represents a packaging in the database.
 * A packaging is a sellable unit of n products in the system.
 * For instance, a combination of a gaming console and a controller.
 */
@Entity
@Table(name = Packaging.TABLE_NAME)
public class Packaging {
  
  public static final String TABLE_NAME = "packaging";
  public static final String PRIMARY_KEY = "packaging_id";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = Packaging.PRIMARY_KEY)
  private Long id;

  @Column(name = "description")
  private String description;

  @Column(name = "image_urls")
  @JdbcTypeCode(SqlTypes.JSON)
  private List<String> imageUrls;

  @OneToMany(mappedBy = "packaging")
  private List<ProductPackaging> products = new ArrayList<>();

  /**
   * Creates a new packaging.
   * 
   * @param description the description of the packaging
   * @param imageUrls a list of image urls for the packaging
   */
  public Packaging(
    String description,
    List<String> imageUrls
  ) {
    this.description = description;
    this.imageUrls = imageUrls;
  }

  /**
   * Adds a product to this packaging.
   * 
   * @param product the product to add to this packaging
   */
  public void addProduct(ProductPackaging product) {
    product.setPackaging(this);
    this.products.add(product);
  }

  /**
   * Removes a product from this packaging.
   * 
   * @param product the product to remove from this packaging
   */
  public void removeProduct(ProductPackaging product) {
    product.setPackaging(null);
    this.products.remove(product);
  }

}
