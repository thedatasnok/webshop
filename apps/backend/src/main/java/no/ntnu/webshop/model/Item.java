package no.ntnu.webshop.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Represents an item in the database. Can be part of a item family, and have multiple categories.
 * Can also be composed into multiple sellable units, which are represented by the Product class.
 * 
 * @see ItemFamily
 * @see Category
 * @see ProductItem
 * @see Product
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = Item.TABLE_NAME)
public class Item {

  public static final String TABLE_NAME = "item";
  public static final String PRIMARY_KEY = "item_id";

  @Id
  @Column(name = Item.PRIMARY_KEY)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  /**
   * A price guidance for the item. Note that this is not the actual price.
   */
  @Column(name = "price_guidance")
  private Double priceGuidance;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_item_family_id", referencedColumnName = ItemFamily.PRIMARY_KEY)
  private ItemFamily family;

  /**
   * The defined attributes of this item. The key is the name of the attribute, and the value is the
   * value of the attribute. If the item is part of a item family, the value must be in the list of
   * possible values for the attribute, in the attribute map of the item family.
   */
  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "defined_attributes")
  private Map<String, String> attributes;

  @ManyToMany(mappedBy = "items")
  private Set<Category> categories = new HashSet<>();

  @OneToMany(mappedBy = "item")
  private List<ProductItem> products = new ArrayList<>();

  /**
   * Creates a new item with the given parameters.
   * 
   * @param name          the name of the item
   * @param description   a description of the item
   * @param priceGuidance a price guidance for the item
   * @param family        the item family the item belongs to
   * @param attributes    the defined attributes of the item
   */
  public Item(
      String name,
      String description,
      Double priceGuidance,
      ItemFamily family,
      Map<String, String> attributes
  ) {
    this.name = name;
    this.description = description;
    this.priceGuidance = priceGuidance;
    this.family = family;
    this.attributes = attributes;
  }

}
