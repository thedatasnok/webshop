package no.ntnu.webshop.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.category.CategoryDto;
import no.ntnu.webshop.contracts.category.CreateCategoryRequest;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.contracts.product.ProductDetails;
import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.ProductJpaRepository;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.service.ProductService;
import no.ntnu.webshop.service.UserAccountService;
import no.ntnu.webshop.utility.AuthorizationTestUtility;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class ProductControllerTests {
  private final ObjectMapper objectMapper;
  private final ProductJpaRepository productJpaRepository;
  private final WebApplicationContext context;
  private final UserAccountService userAccountService;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final AuthorizationTestUtility authorizationTestUtility;
  private final ProductService productService;

  private MockMvc mockMvc;
  private UserAccount userAccount;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
      .apply(SecurityMockMvcConfigurers.springSecurity())
      .build();

    this.userAccount = this.userAccountService
      .createUserAccount("Bob the Mocker", "mock@bob.com", "password", UserAccountRole.SHOP_OWNER);
  }

  @AfterEach
  void cleanup() {
    this.userAccountJpaRepository.delete(this.userAccount);
  }

  @Test
  void canCreateAndDeleteProduct() throws Exception {
    var request = new CreateProductRequest(
      "sample product",
      "",
      "sample description",
      "",
      List.of("https://example.com/image.png"),
      300.0,
      false,
      null,
      Set.of(),
      Map.of(),
      Map.of()
    );

    var countBefore = this.productJpaRepository.count();

    var result = this.mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/products")
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(request))
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber())
      .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("sample product"))
      .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("sample description"))
      .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrls").isArray())
      .andExpect(MockMvcResultMatchers.jsonPath("$.imageUrls[0]").value("https://example.com/image.png"))
      .andExpect(MockMvcResultMatchers.jsonPath("$.price").value(300.0))
      .andExpect(MockMvcResultMatchers.jsonPath("$.isDiscount").value(false))
      .andExpect(MockMvcResultMatchers.jsonPath("$.familyId").doesNotExist())
      .andExpect(MockMvcResultMatchers.jsonPath("$.attributes").isEmpty())
      .andExpect(MockMvcResultMatchers.jsonPath("$.children").isEmpty())
      .andReturn();

    assertEquals(countBefore + 1, this.productJpaRepository.count());

    var id = this.objectMapper.readValue(result.getResponse().getContentAsString(), ProductDetails.class).id();

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.delete("/api/v1/products/" + id + "?force=true")
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isNoContent());

    assertFalse(this.productJpaRepository.existsById(id), "Product was not deleted");
  }

  /**
   * 
   * Tests the endpoint to find related products. Creates a test category and three products, one
   * without category and two with the same category. Asserts that the related product is at the first
   * position in the list.
   * 
   * @throws Exception if an error occurs during the test.
   */
  @Test
  void canFindRelatedProducts() throws Exception {
    var categoryRequest = new CreateCategoryRequest(
      UUID.randomUUID().toString(),
      ""
    );

    var categoryResult = this.mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/categories")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
          .content(objectMapper.writeValueAsString(categoryRequest))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(categoryRequest.name()))
      .andExpect(MockMvcResultMatchers.jsonPath("$.iconUrl").value(categoryRequest.iconUrl()));

    var categoryId = this.objectMapper
      .readValue(categoryResult.andReturn().getResponse().getContentAsString(), CategoryDto.class)
      .id();

    var request = new CreateProductRequest(
      "sample product",
      "",
      "sample description",
      "",
      List.of("https://example.com/image.png"),
      300.0,
      false,
      null,
      Set.of(categoryId),
      Map.of(),
      Map.of()
    );

    var productId1 = this.productService.createProduct(request).getId();
    var productId2 = this.productService.createProduct(request).getId();
    var productId3 = this.productService.createProduct(request).getId();

    // get related products for the second product
    var relatedProductSecondProduct = this.mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/products/" + productId2 + "/related")
          .contentType(MediaType.APPLICATION_JSON)
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andReturn()
      .getResponse()
      .getContentAsString();

    // get the list of related products
    List<ProductListItem> secondProductRelatedList = this.objectMapper
      .readValue(relatedProductSecondProduct, new TypeReference<List<ProductListItem>>(){});

    // asserts that the first related product is the third product
    // This is because the third product has the same category as the second product
    assertEquals(secondProductRelatedList.get(0).id(), productId3);

    // does the same for the third product
    var relatedProductsThirdProduct = this.mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/products/" + productId3 + "/related")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andReturn()
      .getResponse()
      .getContentAsString();

    List<ProductListItem> thirdProductRelatedList = this.objectMapper
      .readValue(relatedProductsThirdProduct, new TypeReference<List<ProductListItem>>(){});

    assertEquals(thirdProductRelatedList.get(0).id(), productId2);

    // cleanup
    this.productService.deleteProductById(productId1, true);
    this.productService.deleteProductById(productId2, true);
    this.productService.deleteProductById(productId3, true);

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.delete("/api/v1/categories/" + categoryId)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk());
  }

  /**
   * Tests the endpoint to find featured products. Creates 4 products on discount and 11 other
   * products. Tests if the featured products does not contain more than 10 products. Tests if the
   * featured products contains the 4 products on discount.
   * 
   * @throws Exception
   */
  @Test
  void canFindFeaturedProducts() throws Exception {
    var discountProduct = new CreateProductRequest(
      "sample product",
      "",
      "sample description",
      "",
      List.of("https://example.com/image.png"),
      300.0,
      true,
      null,
      Set.of(),
      Map.of(),
      Map.of()
    );

    List<Long> discountedProductIds = new ArrayList<>();

    // 4 products on discount
    for (int i = 0; i < 4; i++) {
      discountedProductIds.add(this.productService.createProduct(discountProduct).getId());
    }

    var regularProduct = new CreateProductRequest(
      "sample product",
      "",
      "sample description",
      "",
      List.of("https://example.com/image.png"),
      300.0,
      false,
      null,
      Set.of(),
      Map.of(),
      Map.of()
    );

    List<Long> regularProductIds = new ArrayList<>();

    // 10 regular products
    for (int i = 0; i < 11; i++) {
      regularProductIds.add(this.productService.createProduct(regularProduct).getId());
    }

    var featuredProducts = mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/products/featured")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andReturn()
      .getResponse()
      .getContentAsString();

    List<ProductListItem> featuredProductList = this.objectMapper
      .readValue(featuredProducts, new TypeReference<List<ProductListItem>>(){});

    // Asserts that there is 10 featured products, since featured products only takes in 10 products.
    assertEquals(10, featuredProductList.size());

    // Asserts that the products on discount is in the featured product list
    // The first featuredProduct should be the last discount product created and so on.
    assertEquals(featuredProductList.get(0).id(), discountedProductIds.get(3));
    assertEquals(featuredProductList.get(1).id(), discountedProductIds.get(2));
    assertEquals(featuredProductList.get(2).id(), discountedProductIds.get(1));
    assertEquals(featuredProductList.get(3).id(), discountedProductIds.get(0));

    // cleanup
    Stream.of(discountedProductIds, regularProductIds)
      .flatMap(Collection::stream)
      .forEach(id -> this.productService.deleteProductById(id, true));
  }

}
