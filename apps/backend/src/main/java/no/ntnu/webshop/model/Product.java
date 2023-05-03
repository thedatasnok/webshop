package no.ntnu.webshop.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreRemove;
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

  @Column(name = "short_name")
  private String shortName;

  @Column(name = "description")
  private String description;

  @Column(name = "short_description")
  private String shortDescription;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "image_urls")
  private List<String> imageUrls;

  @Column(name = "price_guidance")
  private Double priceGuidance;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "defined_attributes")
  private Map<String, Map<String, String>> attributes;

  @ManyToOne
  @JoinColumn(name = "fk_product_family_id", referencedColumnName = ProductFamily.PRIMARY_KEY)
  private ProductFamily family;

  /**
   * The child products of this product, which then compose this product.
   */
  @OneToMany(mappedBy = "parent", cascade = {
      CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH
  })
  private List<ProductChild> children = new ArrayList<>();

  /**
   * The parent products of this product. This is a list because a product can be part of multiple
   * aggregate products.
   */
  @OneToMany(mappedBy = "child", cascade = {
      CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH
  })
  private List<ProductChild> parents = new ArrayList<>();

  /**
   * A list of the prices for this product. There is no guarantee of the existence of a price, and a
   * product should be deemed inactive/not for sale if there are no prices. There should be at most
   * one active price for the product.
   */
  @OneToMany(mappedBy = "product", cascade = {
      CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH
  })
  private List<ProductPrice> prices = new ArrayList<>();

  @ManyToMany(mappedBy = "products")
  private Set<Category> categories = new HashSet<>();

  /**
   * Creates a new product.
   * 
   * @param name        the name of the product
   * @param description the description of the product
   * @param imageUrls   a list of image urls for the product
   * @param family      the family the product belongs to, or null if none
   */
  public Product(
      String name,
      String shortName,
      String description,
      String shortDescription,
      List<String> imageUrls,
      ProductFamily family,
      Map<String, Map<String, String>> attributes
  ) {
    this.name = name;
    this.shortName = shortName;
    this.description = description;
    this.shortDescription = shortDescription;
    this.imageUrls = imageUrls;
    this.family = family;
    this.attributes = attributes;
  }

  /**
   * Adds a item to this product.
   * 
   * @param item the item to add to this product
   */
  public void addChild(
      ProductChild child
  ) {
    child.setParent(this);
    this.children.add(child);
  }

  /**
   * Removes a product from this product.
   * 
   * @param child the item to remove from this product
   */
  public void removeChild(
      ProductChild child
  ) {
    child.setParent(null);
    this.children.remove(child);
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

  /**
   * Adds a category to this product. This will also update the Category side of the relationship.
   * 
   * @param category the category to add to this product
   */
  public void addCategory(
      Category category
  ) {
    this.categories.add(category);
    category.addProduct(this);
  }

  /**
   * Removes a category from this product. This will also update the Category side of the
   * relationship.
   * 
   * @param category the category to remove from this product
   */
  public void removeCategory(
      Category category
  ) {
    this.categories.remove(category);
    category.removeProduct(this);
  }

  /**
   * Checks whether the product adheres to the family's defined attribute map.
   * 
   * @return true if the product adhered to the family's defined attribute map, false otherwise
   */
  public boolean isAttributesValid() {
    if (this.family == null || this.family.getAttributeMap() == null)
      return true;

    for (var groupKey : this.family.getAttributeMap().keySet()) {
      // missing attribute group
      if (!this.attributes.containsKey(groupKey))
        return false;

      var group = this.attributes.get(groupKey);
      var familyGroup = this.family.getAttributeMap().get(groupKey);

      for (var attributeEntry : familyGroup.entrySet()) {
        // missing attribute
        if (!group.containsKey(attributeEntry.getKey()))
          return false;

        // the value of the attribute is not within the family's defined values
        if (!attributeEntry.getValue().contains(group.get(attributeEntry.getKey())))
          return false;
      }
    }

    return true;
  }

  @PreRemove
  private void clearCategories() {
    for (var category : this.categories) {
      category.removeProduct(this);
    }
  }

}
