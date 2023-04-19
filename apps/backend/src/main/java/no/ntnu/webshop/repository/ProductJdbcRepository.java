package no.ntnu.webshop.repository;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.product.ProductDetails;
import no.ntnu.webshop.contracts.product.ProductVariant;
import no.ntnu.webshop.contracts.product.ProductChildDetails;
import no.ntnu.webshop.error.model.MappingException;

@Repository
@RequiredArgsConstructor
public class ProductJdbcRepository {
  private final NamedParameterJdbcTemplate jdbcTemplate;
  private final ObjectMapper objectMapper;

  private static final TypeReference<List<String>> STRING_LIST_TYPE_REF = new TypeReference<>(){};
  private static final TypeReference<Map<String, Map<String, String>>> ATTRIBUTE_MAP_TYPE_REF = new TypeReference<>(){};
  private static final TypeReference<List<ProductChildDetails>> PRODUCT_CHILD_DETAILS_LIST_TYPE_REF = new TypeReference<>(){};
  private static final TypeReference<List<ProductVariant>> PRODUCT_VARIANT_LIST_TYPE_REF = new TypeReference<>(){};

  /**
   * Finds a product by its id, including its items and price.
   * 
   * @param id the id of the product to find
   * 
   * @return the product details
   */
  public ProductDetails findById(
      Long id
  ) {
    // couldn't find a way to do this with JPQL/HQL
    // so we're using native SQL instead
    return this.jdbcTemplate.queryForObject("""
      SELECT
        p.product_id,
        p.name,
        p.short_name,
        p.description,
        p.short_description,
        p.image_urls,
        pp.is_discount,
        pp.price,
        prev_pp.price AS previous_price,
        -- Merges the defined attributes of the product with the shared attributes of the family
        COALESCE(
          p.defined_attributes::jsonb || p_family.shared_attributes::jsonb, 
          p.defined_attributes::jsonb, 
          p_family.shared_attributes::jsonb, 
          '{}'
        ) AS attributes,
        -- Finds all children products and groups them into a JSON array
        COALESCE(JSON_AGG(JSON_BUILD_OBJECT(
          'id', child.product_id,
          'quantity', p_child.quantity,
          'name', child.name,
          'description', child.description,
          'attributes', child.defined_attributes
        )) FILTER (WHERE child.product_id IS NOT NULL), '[]') AS children,
        -- Finds all variants in the same family as the product and groups them into a JSON array
        COALESCE(JSON_AGG(JSON_BUILD_OBJECT(
          'id', p_variants.product_id,
          'shortName', p_variants.short_name
        )) FILTER (WHERE p_variants.product_id IS NOT NULL), '[]') AS variants
      FROM product p
      LEFT JOIN product_price pp ON
        (pp.fk_product_id = :id) AND
        (pp.time_from <= NOW()) AND
        (pp.time_to IS NULL)
      LEFT JOIN product_price prev_pp
        ON prev_pp.fk_product_id = :id
        AND prev_pp.time_to = pp.time_from
      LEFT JOIN product_child p_child
        ON p_child.fk_parent_id = :id
      LEFT JOIN product child
        ON child.product_id = p_child.fk_child_id
      LEFT JOIN product p_variants
        ON p_variants.fk_product_family_id = p.fk_product_family_id
      LEFT JOIN product_family p_family
        ON p.fk_product_family_id = p_family.product_family_id
      WHERE
        p.product_id = :id
      GROUP BY
        p.product_id,
        pp.product_price_id,
        prev_pp.product_price_id,
        p_family.product_family_id
      """, Map.of("id", id), (rs, rowNum) -> {
      try {
        return new ProductDetails(
          rs.getLong("product_id"),
          rs.getString("name"),
          rs.getString("short_description"),
          rs.getString("description"),
          this.objectMapper.readValue(rs.getString("image_urls"), STRING_LIST_TYPE_REF),
          rs.getDouble("price"),
          rs.getBoolean("is_discount"),
          rs.getDouble("previous_price"),
          this.objectMapper.readValue(rs.getString("attributes"), ATTRIBUTE_MAP_TYPE_REF),
          this.objectMapper.readValue(rs.getString("children"), PRODUCT_CHILD_DETAILS_LIST_TYPE_REF),
          this.objectMapper.readValue(rs.getString("variants"), PRODUCT_VARIANT_LIST_TYPE_REF)
        );
      } catch (Exception e) {
        e.printStackTrace();
        throw new MappingException("Failed to convert product to ProductDetails");
      }
    });
  }

}
