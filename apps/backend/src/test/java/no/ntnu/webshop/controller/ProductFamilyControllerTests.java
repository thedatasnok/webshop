package no.ntnu.webshop.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import no.ntnu.webshop.contracts.productfamily.CreateProductFamilyRequest;
import no.ntnu.webshop.contracts.productfamily.ProductFamilyListItem;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.ProductFamilyJpaRepository;
import no.ntnu.webshop.service.UserAccountService;
import no.ntnu.webshop.utility.AuthorizationTestUtility;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class ProductFamilyControllerTests {
  private final WebApplicationContext context;
  private final UserAccountService userAccountService;
  private final ObjectMapper objectMapper;
  private final AuthorizationTestUtility authorizationTestUtility;
  private final ProductFamilyJpaRepository productFamilyJpaRepository;

  private MockMvc mockMvc;
  private UserAccount userAccount;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
      .apply(SecurityMockMvcConfigurers.springSecurity())
      .build();

    this.userAccount = this.userAccountService
      .createUserAccount("Mock bob", "mockbob@mail.com", "password", UserAccountRole.SHOP_OWNER);
  }

  @AfterEach
  void cleanup() {
    this.userAccountService.deleteAll(this.userAccount);
  }

  @Test
  void canCreateProductFamily() throws Exception {

    var randomName = UUID.randomUUID().toString();

    var request = new CreateProductFamilyRequest(
      randomName,
      "A test family",
      Map.of("General", Map.of("Warranty", "1 year")),
      Map.of()
    );

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/product-families")
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(request))
          .header("Authorization", this.authorizationTestUtility.generateJwt(this.userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isCreated())
      .andReturn();

    var result = this.mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/product-families?name={name}", randomName)
          .header("Authorization", this.authorizationTestUtility.generateJwt(this.userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
      .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1))
      .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value(randomName))
      .andExpect(MockMvcResultMatchers.jsonPath("$[0].sharedAttributes.General.Warranty").value("1 year"))
      .andReturn();

    var response = this.objectMapper
      .readValue(result.getResponse().getContentAsString(), new TypeReference<List<ProductFamilyListItem>>(){});

    this.productFamilyJpaRepository.deleteById(response.get(0).id());
  }

}
