package no.ntnu.webshop.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.Map;
import java.util.Set;

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
import no.ntnu.webshop.contracts.address.AddressDto;
import no.ntnu.webshop.contracts.order.OrderDetails;
import no.ntnu.webshop.contracts.order.PlaceOrderRequest;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.model.Product;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.service.OrderService;
import no.ntnu.webshop.service.ProductService;
import no.ntnu.webshop.utility.AuthorizationTestUtility;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class UserContextOrderControllerTests {
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final OrderJpaRepository orderJpaRepository;
  private final PasswordEncoder passwordEncoder;
  private final WebApplicationContext context;
  private final ObjectMapper objectMapper;
  private final AuthorizationTestUtility authorizationTestUtility;
  private final ProductService productService;
  private final OrderService orderService;

  private static final String FULL_NAME = "Bob";
  private static final String EMAIL = "bob@example.com";
  private static final String PASSWORD = "password";

  private static final AddressDto ADDRESS_DTO = new AddressDto(
    "Norway",
    "1000",
    "Oslo",
    "Mock Street",
    "Bob the Mocker"

  );

  private MockMvc mockMvc;
  private UserAccount user;
  private Product product;

  @BeforeEach
  void setup() {
    var account = new UserAccount(
      FULL_NAME,
      EMAIL,
      this.passwordEncoder.encode(PASSWORD),
      UserAccountRole.CUSTOMER
    );

    this.product = this.productService.createProduct(
      new CreateProductRequest(
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
      )
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

    this.productService.deleteProductById(this.product.getId(), true);
  }

  /**
   * Tests that an order can be placed.
   */
  @Test
  void canPlaceAndCancelOrder() throws Exception {
    var request = new PlaceOrderRequest(
      "bob the mocker",
      ADDRESS_DTO,
      ADDRESS_DTO,
      true,
      "CRYPTO",
      "DRONE",
      Map.of(this.product.getId(), 1)
    );

    var countBefore = this.orderJpaRepository.count();

    var result = this.mockMvc
      .perform(
        MockMvcRequestBuilders.post("/api/v1/me/orders")
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(request))
          .header("Authorization", this.authorizationTestUtility.generateJwt(user))
      )
      .andExpect(MockMvcResultMatchers.status().isCreated())
      .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber())
      .andExpect(MockMvcResultMatchers.jsonPath("$.customerName").value("bob the mocker"))
      .andExpect(MockMvcResultMatchers.jsonPath("$.deliveryAddress").isMap())
      .andExpect(MockMvcResultMatchers.jsonPath("$.billingAddress").isMap())
      .andExpect(MockMvcResultMatchers.jsonPath("$.paymentMethod").value("CRYPTO"))
      .andExpect(MockMvcResultMatchers.jsonPath("$.shippingMethod").value("DRONE"))
      .andExpect(MockMvcResultMatchers.jsonPath("$.lines").isNotEmpty())
      .andReturn();

    assertEquals(countBefore + 1, this.orderJpaRepository.count());

    var id = this.objectMapper.readValue(result.getResponse().getContentAsString(), OrderDetails.class).id();

    var order = this.orderJpaRepository.findById(id);

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.patch("/api/v1/me/orders/" + id + "/cancel")
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(request))
          .header("Authorization", this.authorizationTestUtility.generateJwt(user))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("CANCELLED"))
      .andReturn();

    assertNotNull(order.get(), "Could not find the order we just placed");

    this.orderService.deleteOrder(order.get());
  }
}
