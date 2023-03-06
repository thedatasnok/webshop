package no.ntnu.webshop.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * Represents an address. Is an embeddable class, meaning it can be used as a property in entity
 * classes. This helps streamline logic for addresses, as they are often used in multiple places.
 */
@Getter
@Builder
@Embeddable
@AllArgsConstructor
public class Address {
  private String country;
  private String postalCode;
  private String city;
  private String street;
  private String careOf;

  /**
   * Copies the address details from an existing instance into a new one.
   * 
   * @param address the instance to copy from
   * 
   * @return a new instance with the same values as the given instance
   */
  public static Address copyOf(
      Address address
  ) {
    return new Address(
      address.getCountry(),
      address.getPostalCode(),
      address.getCity(),
      address.getStreet(),
      address.getCareOf()
    );
  }

}
