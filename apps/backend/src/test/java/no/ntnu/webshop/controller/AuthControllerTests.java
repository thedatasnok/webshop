package no.ntnu.webshop.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

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
import no.ntnu.webshop.contracts.auth.SignInRequest;
import no.ntnu.webshop.contracts.auth.SignUpRequest;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class AuthControllerTests {
  private final ObjectMapper objectMapper;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final WebApplicationContext context;

  private MockMvc mockMvc;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
      .apply(SecurityMockMvcConfigurers.springSecurity())
      .build();
  }

  @Test
  void userRegistrationWorks() throws Exception {
    var email = "bob@mocker.org";
    var password = "thisPasswordShouldPassTheStrengthValidation321";

    var signUpRequest = new SignUpRequest(
      "Kalle L",
      email,
      password,
      password
    );

    var countBefore = this.userAccountJpaRepository.count();
    var wasInitialized = this.userAccountJpaRepository.hasRegisteredOfRole(UserAccountRole.SHOP_OWNER.toString());

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/auth/sign-up")
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(signUpRequest))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.cookie().exists("refresh-token"))
      .andExpect(MockMvcResultMatchers.jsonPath("$.id").isString())
      .andExpect(MockMvcResultMatchers.jsonPath("$.accessToken").isString());

    assertEquals(countBefore + 1, this.userAccountJpaRepository.count());

    var signInRequest = new SignInRequest(
      email,
      password
    );

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/auth/sign-in")
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(signInRequest))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.cookie().exists("refresh-token"))
      .andExpect(MockMvcResultMatchers.jsonPath("$.accessToken").isString());

    var foundAccount = this.userAccountJpaRepository.findByEmail(email);

    assertNotNull(foundAccount.get(), "Could not find the account we just created");

    if (!wasInitialized) {
      assertEquals(UserAccountRole.SHOP_OWNER, foundAccount.get().getRole());
    } else {
      assertEquals(UserAccountRole.CUSTOMER, foundAccount.get().getRole());
    }

    this.userAccountJpaRepository.delete(foundAccount.get());
  }

}
