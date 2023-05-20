package no.ntnu.webshop.controller;

import static org.junit.jupiter.api.Assertions.assertFalse;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.auth.SignInRequest;
import no.ntnu.webshop.contracts.auth.SignInResponse;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.utility.AuthorizationTestUtility;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class UserContextControllerTests {
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final PasswordEncoder passwordEncoder;
  private final WebApplicationContext context;
  private final ObjectMapper objectMapper;
  private final AuthorizationTestUtility authorizationTestUtility;

  private static final String FULL_NAME = "Bob";
  private static final String EMAIL = "bob@example.com";
  private static final String PASSWORD = "password";

  private MockMvc mockMvc;
  private UserAccount user;

  @BeforeEach
  void setup() {
    var account = new UserAccount(
      FULL_NAME,
      EMAIL,
      this.passwordEncoder.encode(PASSWORD),
      UserAccountRole.CUSTOMER
    );

    this.user = this.userAccountJpaRepository.save(account);
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
      .apply(SecurityMockMvcConfigurers.springSecurity())
      .build();
  }

  @AfterEach
  void cleanup() {
    if (this.user != null) {
      this.userAccountJpaRepository.delete(user);
    }
  }

  /**
   * Tests that the user profile is evaluated correctly, not being inferred from token.y
   */
  @Test
  void userProfileReflectsChanges() throws Exception {
    var signInRequest = new SignInRequest(
      EMAIL,
      PASSWORD
    );

    var signInResult = this.mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/auth/sign-in")
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(signInRequest))
      )
      .andReturn();

    var token = this.objectMapper.readValue(signInResult.getResponse().getContentAsString(), SignInResponse.class)
      .accessToken();

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/me")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", "Bearer ".concat(token))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.id").isString())
      .andExpect(MockMvcResultMatchers.jsonPath("$.fullName", Matchers.is(FULL_NAME)))
      .andExpect(MockMvcResultMatchers.jsonPath("$.email", Matchers.is(EMAIL)))
      .andExpect(MockMvcResultMatchers.jsonPath("$.role", Matchers.is("CUSTOMER")));

    this.userAccountJpaRepository.findByEmail(EMAIL).ifPresent(account -> {
      account.setRole(UserAccountRole.SHOP_OWNER);
      this.userAccountJpaRepository.save(account);
    });

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.get("/api/v1/me")
          .contentType(MediaType.APPLICATION_JSON)
          .header("Authorization", "Bearer " + token)
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.id").isString())
      .andExpect(MockMvcResultMatchers.jsonPath("$.fullName", Matchers.is(FULL_NAME)))
      .andExpect(MockMvcResultMatchers.jsonPath("$.email", Matchers.is(EMAIL)))
      .andExpect(MockMvcResultMatchers.jsonPath("$.role", Matchers.is("SHOP_OWNER")));
  }

  @Test
  void userDeletionWorks() throws Exception {
    this.mockMvc
      .perform(
        MockMvcRequestBuilders.delete("/api/v1/me")
          .cookie(this.authorizationTestUtility.generateJwtCookie(this.user))
          .header("Authorization", this.authorizationTestUtility.generateJwt(this.user))
      )
      .andExpect(MockMvcResultMatchers.status().isOk());

    assertFalse(this.userAccountJpaRepository.existsById(this.user.getId()), "User should have been deleted, but wasn't");

    // prevents the cleanup method from deleting the user again, as it has already been deleted
    this.user = null;
  }

}
