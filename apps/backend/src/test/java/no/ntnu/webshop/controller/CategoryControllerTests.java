package no.ntnu.webshop.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

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
import no.ntnu.webshop.contracts.category.CreateCategoryRequest;
import no.ntnu.webshop.model.Category;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.CategoryJpaRepository;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.service.UserAccountService;
import no.ntnu.webshop.utility.AuthorizationTestUtility;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class CategoryControllerTests {

  private final ObjectMapper objectMapper;
  private final WebApplicationContext context;
  private final UserAccountService userAccountService;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final AuthorizationTestUtility authorizationTestUtility;
  private final CategoryJpaRepository categoryJpaRepository;

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
  void canCreateCategoryAndDelete() throws Exception {
    var request = new CreateCategoryRequest(
      "test category",
      ""
    );

    int countBefore = this.categoryJpaRepository.findAll().size();

    var result = mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/categories")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
          .content(objectMapper.writeValueAsString(request))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(request.name()))
      .andExpect(MockMvcResultMatchers.jsonPath("$.iconUrl").value(request.iconUrl()));

    assertEquals(countBefore + 1, this.categoryJpaRepository.findAll().size());

    Integer id = objectMapper.readValue(result.andReturn().getResponse().getContentAsString(), Category.class).getId();

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.delete("/api/v1/categories/" + id)
          .header("Authorization", this.authorizationTestUtility.generateJwt(userAccount))
      )
      .andExpect(MockMvcResultMatchers.status().isOk());

    assertFalse(this.categoryJpaRepository.existsById(id), "Category was not deleted");
  }

}
