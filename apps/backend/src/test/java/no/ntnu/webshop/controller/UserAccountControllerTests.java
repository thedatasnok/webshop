package no.ntnu.webshop.controller;

import java.util.UUID;

import org.hamcrest.text.StringContainsInOrder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.service.UserAccountService;
import no.ntnu.webshop.utility.AuthorizationTestUtility;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class UserAccountControllerTests {
  private final WebApplicationContext context;
  private final UserAccountService userAccountService;
  private final AuthorizationTestUtility authorizationTestUtility;

  private MockMvc mockMvc;
  private UserAccount owner;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
      .apply(SecurityMockMvcConfigurers.springSecurity())
      .build();

    this.owner = this.userAccountService
      .createUserAccount("Mock bob", "mocker@bob.com", "password", UserAccountRole.SHOP_OWNER);
  }

  @AfterEach
  void cleanup() {
    this.userAccountService.deleteAll(this.owner);
  }

  @Test
  void canFindUserAccounts() throws Exception {
    var randomName = UUID.randomUUID().toString();
    var randomEmail = randomName.concat("@mail.com");

    var randomUser = this.userAccountService
      .createUserAccount(randomName, randomEmail, "password", UserAccountRole.CUSTOMER);

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/user-accounts?email={email}", randomEmail)
          .header("Authorization", this.authorizationTestUtility.generateJwt(this.owner))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$[0].email").value(randomEmail))
      .andExpect(MockMvcResultMatchers.jsonPath("$[0].role").value(UserAccountRole.CUSTOMER.name()));

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/user-accounts?fullName={name}", randomName)
          .header("Authorization", this.authorizationTestUtility.generateJwt(this.owner))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(
        MockMvcResultMatchers.jsonPath("$[0].name").value(StringContainsInOrder.stringContainsInOrder(randomName))
      );

    this.userAccountService.deleteAll(randomUser);
  }

}
