package no.ntnu.webshop.model;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.Test;

class ProductTests {

  @Test
  void canValidateProductAttributes() {
    var family = new ProductFamily(
      "Sample family",
      "Yep",
      Map.of(),
      Map.of("Design", Map.of("Color", Set.of("Red", "Blue", "Green")))
    );

    var product = new Product(
      "null",
      "",
      "",
      "",
      List.of(),
      family,
      Map.of("Design", new HashMap<>(Map.of("Color", "Red")))
    );

    assertTrue(product.isAttributesValid());

    product.getAttributes().get("Design").put("Color", "Blue");

    assertTrue(product.isAttributesValid());

    // yellow is not in the initial set, this should "fail" the validation

    product.getAttributes().get("Design").put("Color", "Yellow");

    assertFalse(product.isAttributesValid());
  }

}
