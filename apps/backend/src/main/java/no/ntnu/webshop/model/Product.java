package no.ntnu.webshop.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Represents a product in the database. A product is a sellable unit of n items in the system. For
 * instance, a combination of a gaming console and a controller.
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = Product.TABLE_NAME)
public class Product {

  public static final String TABLE_NAME = "product";
  public static final String PRIMARY_KEY = "product_id";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = Product.PRIMARY_KEY)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "short_description")
  private String shortDescription;

  @Column(name = "description")
  private String description;

  @Column(name = "image_urls")
  @JdbcTypeCode(SqlTypes.JSON)
  private List<String> imageUrls;

  @OneToMany(mappedBy = "product", cascade = {
      CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH
  })
  private List<ProductItem> items = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = {
      CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH
  })
  private List<ProductPrice> prices = new ArrayList<>();

  /**
   * Creates a new product.
   * 
   * @param description the description of the product
   * @param imageUrls   a list of image urls for the product
   */
  public Product(
      String name,
      String description,
      List<String> imageUrls
  ) {
    this.name = name;
    this.description = description;
    this.imageUrls = imageUrls;
  }

  /**
   * Adds a item to this product.
   * 
   * @param item the item to add to this product
   */
  public void addItem(
      ProductItem item
  ) {
    item.setProduct(this);
    this.items.add(item);
  }

  /**
   * Removes a product from this product.
   * 
   * @param item the item to remove from this product
   */
  public void removeItem(
      ProductItem item
  ) {
    item.setProduct(null);
    this.items.remove(item);
  }

  /**
   * Adds a price to this product.
   * 
   * @param price the price to add to this product
   */
  public void addPrice(
      ProductPrice price
  ) {
    this.prices.add(price);
  }

}
