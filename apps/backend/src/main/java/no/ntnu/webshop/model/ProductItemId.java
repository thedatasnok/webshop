package no.ntnu.webshop.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

/**
 * Represents the primary key of the ProductItem entity.
 * 
 * @see ProductItem
 */
@AllArgsConstructor
@EqualsAndHashCode
public class ProductItemId implements Serializable {
  private Long productId;
  private Long itemId;
}
