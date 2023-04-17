package no.ntnu.webshop.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a product family in the database. A product family consists of a number of products,
 * with a number of shared attributes. Each product in the family has a set of defined attributes
 * that are based off the attributes mapped in this entity.
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = ProductFamily.TABLE_NAME)
public class ProductFamily {

  public static final String TABLE_NAME = "product_family";
  public static final String PRIMARY_KEY = "product_family_id";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = ProductFamily.PRIMARY_KEY)
  private Long id;

  @Setter
  @Column(name = "name")
  private String name;

  @Setter
  @Column(name = "description")
  private String description;

  /**
   * A set of shared attributes that are shared by all items in this family. The key is the name of
   * the attribute, and the value is the value of the attribute.
   * 
   * For instance: A item family of mice can have the same type of sensor, so the shared attribute
   * could be "sensorType" with the value "optical".
   */
  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "shared_attributes")
  private Map<String, String> sharedAttributes;

  /**
   * Holds a map of attributes that can be set by items in this family. The key is the name of the
   * attribute, and the value is a list of possible values a product can have.
   * 
   * For instance: An item family of mice can have different colors, so the attribute could be "color"
   * with the available values being "red", "blue", "green", etc.
   */
  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "attribute_map")
  private Map<String, Set<String>> attributeMap;

  @OneToMany(mappedBy = "family")
  private List<Product> products = new ArrayList<>();

  /**
   * Creates a new item family with the given name, description, shared attributes and attribute map.
   * 
   * @param name             the name of the item family
   * @param description      the description of the item family
   * @param sharedAttributes the shared attributes of the item family
   * @param attributeMap     the attribute map of the item family
   */
  public ProductFamily(
      String name,
      String description,
      Map<String, String> sharedAttributes,
      Map<String, Set<String>> attributeMap
  ) {
    this.name = name;
    this.description = description;
    this.sharedAttributes = sharedAttributes;
    this.attributeMap = attributeMap;
  }

  /**
   * Adds a shared attribute to the item family.
   * 
   * @param key   the name of the attribute
   * @param value the value of the shared attribute
   */
  public void addSharedAttribute(
      String key,
      String value
  ) {
    this.sharedAttributes.put(key, value);
  }

  /**
   * Adds a new attribute to the map of attributes a item in this family can define.
   * 
   * @param key   the name of the attribute
   * @param value a possible value for the attribute
   */
  public void addAttribute(
      String key,
      String value
  ) {
    this.attributeMap.get(key).add(value);
  }

}
