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
 * Represents a product in the database. 
 * Can be part of a product family, and have multiple categories.
 * Can also be composed into multiple sellable units, which are represented by the Packaging class.
 * 
 * @see ProductFamily
 * @see Category
 * @see ProductPackaging
 * @see Packaging
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = Product.TABLE_NAME)
public class Product {
  
  public static final String TABLE_NAME = "product";
  public static final String PRIMARY_KEY = "product_id";

  @Id
  @Column(name = Product.PRIMARY_KEY)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  /**
   * A price guidance for the product. 
   * Note that this is not the actual price.
   */
  @Column(name = "price_guidance")
  private Double priceGuidance;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "fk_product_family_id", referencedColumnName = ProductFamily.PRIMARY_KEY)
  private ProductFamily family;
  
  /**
   * The defined attributes of this product.
   * The key is the name of the attribute, and the value is the value of the attribute.
   * If the product is part of a product family, the value must be in the list of
   * possible values for the attribute, in the attribute map of the product family. 
   */
  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "defined_attributes")
  private Map<String, String> attributes;

  @ManyToMany(mappedBy = "products")
  private Set<Category> categories = new HashSet<>();

  @OneToMany(mappedBy = "product")
  private List<ProductPackaging> packagings = new ArrayList<>();

}
