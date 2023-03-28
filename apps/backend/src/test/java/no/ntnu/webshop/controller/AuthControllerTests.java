package no.ntnu.webshop.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.contracts.auth.SignInRequest;
import no.ntnu.webshop.contracts.auth.SignUpRequest;
import no.ntnu.webshop.repository.UserAccountJpaRepository;

@SpringBootTest
@RequiredArgsConstructor
public class AuthControllerTests {
  private final ObjectMapper objectMapper;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final WebApplicationContext context;

  private MockMvc mockMvc;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();
  }

  @Test
  void userRegistrationWorks() throws Exception {
    var email = "kalle@noreply.org";
    var password = "thisPasswordShouldPassTheStrengthValidation321";

    var signUpRequest = new SignUpRequest(
      "Kalle L",
      email,
      password,
      password
    );

    assertEquals(0, this.userAccountJpaRepository.count());

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

    assertEquals(1, this.userAccountJpaRepository.count());

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
  }

}
