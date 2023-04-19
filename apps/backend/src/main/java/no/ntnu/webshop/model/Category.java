package no.ntnu.webshop.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Represents a category in the database. Can be associated with multiple items.
 * 
 * @see Item
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = Category.TABLE_NAME)
public class Category {

  public static final String TABLE_NAME = "category";
  public static final String PRIMARY_KEY = "category_id";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = Category.PRIMARY_KEY)
  private Integer id;

  @Column(name = "name")
  private String name;

  @Column(name = "icon_url")
  private String iconUrl;

  @ManyToMany
  @JoinTable(
    name = "product_category",
    joinColumns = @JoinColumn(name = "fk_category_id", referencedColumnName = Category.PRIMARY_KEY),
    inverseJoinColumns = @JoinColumn(name = "fk_product_id", referencedColumnName = Product.PRIMARY_KEY)
  )
  private Set<Product> products = new HashSet<>();

  /**
   * Creates a new category with the given name.
   * 
   * @param name the name of the category
   */
  public Category(
      String name,
      String iconUrl
  ) {
    this.name = name;
    this.iconUrl = iconUrl;
  }

  /**
   * Adds a product to the category.
   * 
   * @param product the product to add to the category
   */
  public void addProduct(Product product) {
    this.products.add(product);
  }

  /**
   * Removes a product from the category.
   * 
   * @param product the product to remove from the category
   */
  public void removeProduct(Product product) {
    this.products.remove(product);
  }

}
