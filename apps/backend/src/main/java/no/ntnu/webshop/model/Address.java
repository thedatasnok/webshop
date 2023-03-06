package no.ntnu.webshop.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {
  
  private String country;
  private String postalCode;
  private String city;
  private String street;
  private String careOf;
}
