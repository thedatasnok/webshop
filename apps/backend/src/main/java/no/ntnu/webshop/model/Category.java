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

  @ManyToMany
  @JoinTable(
    name = "item_category",
    joinColumns = @JoinColumn(name = "fk_category_id", referencedColumnName = Category.PRIMARY_KEY),
    inverseJoinColumns = @JoinColumn(name = "fk_item_id", referencedColumnName = Item.PRIMARY_KEY)
  )
  private Set<Item> items = new HashSet<>();

  /**
   * Creates a new category with the given name.
   * 
   * @param name the name of the category
   */
  public Category(
      String name
  ) {
    this.name = name;
  }

}
