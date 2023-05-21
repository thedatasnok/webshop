package no.ntnu.webshop.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
import no.ntnu.webshop.contracts.address.AddressDto;
import no.ntnu.webshop.contracts.order.PlaceOrderRequest;
import no.ntnu.webshop.contracts.order.UpdateOrderRequest;
import no.ntnu.webshop.contracts.product.CreateProductRequest;
import no.ntnu.webshop.model.OrderStatus;
import no.ntnu.webshop.model.PaymentMethod;
import no.ntnu.webshop.model.PaymentStatus;
import no.ntnu.webshop.model.ShippingMethod;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.OrderJpaRepository;
import no.ntnu.webshop.service.OrderService;
import no.ntnu.webshop.service.ProductService;
import no.ntnu.webshop.service.UserAccountService;
import no.ntnu.webshop.utility.AuthorizationTestUtility;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class OrderControllerTests {
  private final WebApplicationContext context;
  private final OrderService orderService;
  private final OrderJpaRepository orderJpaRepository;
  private final ProductService productService;
  private final UserAccountService userAccountService;
  private final AuthorizationTestUtility authorizationTestUtility;
  private final ObjectMapper objectMapper;

  private MockMvc mockMvc;
  private UserAccount owner;
  private UserAccount customer;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
      .apply(SecurityMockMvcConfigurers.springSecurity())
      .build();

    this.owner = this.userAccountService
      .createUserAccount("Bob the Mocker", "mock@bob.com", "password", UserAccountRole.SHOP_OWNER);
    this.customer = this.userAccountService
      .createUserAccount("Bobs friend", "friendof@bob.com", "password", UserAccountRole.CUSTOMER);
  }

  @AfterEach
  void cleanup() {
    this.userAccountService.deleteAll(this.owner, this.customer);
  }

  @Test
  void canUpdateOrderStatus() throws Exception {
    // Setup
    var product = this.productService.createProduct(
      new CreateProductRequest(
        "sample product",
        "sample",
        "",
        "",
        List.of("https://placehold.co/600x600"),
        300.0,
        false,
        null,
        Set.of(),
        Map.of(),
        Map.of()
      )
    );

    var address = new AddressDto(
      "Norway",
      "6009",
      "Ålesund",
      "Ålesund",
      ""
    );

    var placedOrder = this.orderService.placeOrder(
      new PlaceOrderRequest(
        "Bobs friend",
        address,
        address,
        false,
        PaymentMethod.BIOMETRIC.name(),
        ShippingMethod.DRONE.name(),
        Map.of(product.getId(), 1)
      ),
      customer
    );

    var newOrderStatus = OrderStatus.SHIPPED.name();
    var newPaymentStatus = PaymentStatus.PAID.name();

    var request = new UpdateOrderRequest(
      newOrderStatus,
      newPaymentStatus
    );

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.patch("/api/v1/orders/" + placedOrder.id())
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(request))
          .header("Authorization", this.authorizationTestUtility.generateJwt(owner))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(newOrderStatus))
      .andExpect(MockMvcResultMatchers.jsonPath("$.paymentStatus").value(newPaymentStatus));

    var actualOrder = this.orderService.findById(placedOrder.id());

    assertEquals(newOrderStatus, actualOrder.status());
    assertEquals(newPaymentStatus, actualOrder.paymentStatus());

    newOrderStatus = OrderStatus.CANCELLED.name();
    newPaymentStatus = PaymentStatus.CANCELLED.name();

    request = new UpdateOrderRequest(
      newOrderStatus,
      newPaymentStatus
    );

    this.mockMvc
      .perform(
        MockMvcRequestBuilders.patch("/api/v1/orders/" + placedOrder.id())
          .contentType(MediaType.APPLICATION_JSON)
          .content(this.objectMapper.writeValueAsString(request))
          .header("Authorization", this.authorizationTestUtility.generateJwt(owner))
      )
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(newOrderStatus))
      .andExpect(MockMvcResultMatchers.jsonPath("$.paymentStatus").value(newPaymentStatus));

    actualOrder = this.orderService.findById(placedOrder.id());

    assertEquals(newOrderStatus, actualOrder.status());
    assertEquals(newPaymentStatus, actualOrder.paymentStatus());

    var order = this.orderJpaRepository.findById(placedOrder.id());

    this.orderService.deleteOrder(order.get());
    this.productService.deleteProductById(product.getId(), true);
  }

}
