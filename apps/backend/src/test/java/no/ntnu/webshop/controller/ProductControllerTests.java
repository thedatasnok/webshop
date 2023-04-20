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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.contracts.product.ProductDetails;
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
      .andExpect(MockMvcResultMatchers.status().isOk());

    assertFalse(this.productJpaRepository.existsById(id), "Product was not deleted");
  }

}
