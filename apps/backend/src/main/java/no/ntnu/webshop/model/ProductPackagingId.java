package no.ntnu.webshop.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

/**
 * Represents the primary key of the ProductPackaging entity.
 * 
 * @see ProductPackaging
 */
@AllArgsConstructor
@EqualsAndHashCode
public class ProductPackagingId implements Serializable {
  private Long productId;
  private Long packagingId;
}
