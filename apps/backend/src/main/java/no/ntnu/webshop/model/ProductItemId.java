package no.ntnu.webshop.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents the primary key of the ProductItem entity.
 * 
 * @see ProductItem
 */
@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ProductItemId implements Serializable {
  private Long product;
  private Long item;
}
