package no.ntnu.webshop.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.category.CreateCategoryRequest;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.contracts.product.ProductDetails;
import no.ntnu.webshop.contracts.product.ProductListItem;
import no.ntnu.webshop.model.Category;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.ProductJpaRepository;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.service.UserAccountService;
import no.ntnu.webshop.utility.AuthorizationTestUtility;

@SpringBootTest
@RequiredArgsConstructor
class ProductControllerTests {
  private final ObjectMapper objectMapper;
  private final ProductJpaRepository productJpaRepository;
  private final WebApplicationContext context;
  private final UserAccountService userAccountService;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final AuthorizationTestUtility authorizationTestUtility;

  private MockMvc mockMvc;
  private UserAccount userAccount;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
      .apply(SecurityMockMvcConfigurers.springSecurity())
      .build();

    userAccount = this.userAccountService
      .createUserAccount("Bob the Mocker", "mock@bob.com", "password", UserAccountRole.SHOP_OWNER);
  }

  @AfterEach
  void cleanup() {
    this.userAccountJpaRepository.delete(this.userAccount);
  }

  @Test
  void canCreateProduct() throws Exception {
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

    var result = createProduct(request);

    assertEquals(countBefore + 1, this.productJpaRepository.count());

    var id = this.objectMapper.readValue(result.getResponse().getContentAsString(), ProductDetails.class).id();

    deleteProductWithId(id, userAccount);

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
  void testFindRelatedProducts() throws Exception {
    var categoryRequest = new CreateCategoryRequest(
      "test category",
      ""
    );
    var categoryResult = mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/categories")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
          .content(objectMapper.writeValueAsString(categoryRequest))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(categoryRequest.name()))
      .andExpect(MockMvcResultMatchers.jsonPath("$.iconUrl").value(categoryRequest.iconUrl()));

    Integer categoryId = objectMapper
      .readValue(categoryResult.andReturn().getResponse().getContentAsString(), Category.class)
      .getId();

    var productRequest1 = new CreateProductRequest(
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

    var productRequest2 = new CreateProductRequest(
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

    var productRequest3 = new CreateProductRequest(
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

    var productResult1 = createProduct(productRequest1);
    var productResult2 = createProduct(productRequest2);
    var productResult3 = createProduct(productRequest3);

    var productId1 = this.objectMapper
      .readValue(productResult1.getResponse().getContentAsString(), ProductDetails.class)
      .id();
    var productId2 = this.objectMapper
      .readValue(productResult2.getResponse().getContentAsString(), ProductDetails.class)
      .id();
    var productId3 = this.objectMapper
      .readValue(productResult3.getResponse().getContentAsString(), ProductDetails.class)
      .id();

    // get related products for the second product
    var relatedProductSecondProduct = mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/products/" + productId2 + "/related")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andReturn()
      .getResponse()
      .getContentAsString();

    // get the list of related products
    List<ProductListItem> secondProductRelatedList = objectMapper
      .readValue(relatedProductSecondProduct, new TypeReference<List<ProductListItem>>(){});

    // asserts that the first related product is the third product
    // This is because the third product has the same category as the second product
    assertEquals(secondProductRelatedList.get(0).id(), productId3);

    // does the same for the third product
    var relatedProductsThirdProduct = mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/products/" + productId3 + "/related")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andReturn()
      .getResponse()
      .getContentAsString();

    List<ProductListItem> thirdProductRelatedList = objectMapper
      .readValue(relatedProductsThirdProduct, new TypeReference<List<ProductListItem>>(){});

    assertEquals(thirdProductRelatedList.get(0).id(), productId2);

    // cleanup
    deleteProductWithId(productId1, userAccount);
    deleteProductWithId(productId2, userAccount);
    deleteProductWithId(productId3, userAccount);

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.delete("/api/v1/categories/" + categoryId)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk());
  }

  /**
   * Creates a product and returns the result
   * 
   * @param productRequest the product request
   * @return the result
   * @throws Exception if an error occurs
   */
  private MvcResult createProduct(
      CreateProductRequest productRequest
  ) throws Exception {
    return this.mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/products")
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(productRequest))
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
  }

  /**
   * Deletes a product with the given id
   * 
   * @param id          the id of the product
   * @param userAccount the user account
   * @return the product result
   * @throws Exception if an error occurs
   */
  private void deleteProductWithId(
      Long id,
      UserAccount userAccount
  ) throws Exception {
    mockMvc
      .perform(
        MockMvcRequestBuilders.delete("/api/v1/products/" + id + "?force=true")
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isNoContent());

    assertFalse(this.productJpaRepository.existsById(id), "Product was not deleted");
  }

}
