package no.ntnu.webshop.security;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.model.UserAccount;
import no.ntnu.webshop.model.UserAccountRole;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.annotation.CustomerAuthorization;
import no.ntnu.webshop.security.annotation.ShopOwnerAuthorization;
import no.ntnu.webshop.security.annotation.ShopWorkerAuthorization;
import no.ntnu.webshop.service.UserAccountService;
import no.ntnu.webshop.utility.AuthorizationTestUtility;
import no.ntnu.webshop.utility.EnableTestcontainers;

@SpringBootTest
@EnableTestcontainers
@RequiredArgsConstructor
class AuthorizationTests {
  private final WebApplicationContext context;
  private final UserAccountService userAccountService;
  private final UserAccountJpaRepository userAccountJpaRepository;
  private final AuthorizationTestUtility authorizationTestUtility;

  private MockMvc mockMvc;
  private UserAccount customer;
  private UserAccount shopWorker;
  private UserAccount shopOwner;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
      .apply(SecurityMockMvcConfigurers.springSecurity())
      .build();

    this.customer = this.userAccountService
      .createUserAccount("customer", "customer@example.com", "customer123", UserAccountRole.CUSTOMER);

    this.shopWorker = this.userAccountService
      .createUserAccount("shopworker", "shopworker@example.com", "shopworker123", UserAccountRole.SHOP_WORKER);

    this.shopOwner = this.userAccountService
      .createUserAccount("shopowner", "shopowner@example.com", "shopowner123", UserAccountRole.SHOP_OWNER);
  }

  @AfterEach
  void cleanup() {
    // there might be a more effective way to do this
    this.userAccountJpaRepository.deleteAll(List.of(this.customer, this.shopWorker, this.shopOwner));
  }

  @Test
  void customerAuthorizationWorks() throws Exception {
    // customers can access customer endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_CUSTOMER_URL, this.customer))
      .andExpect(MockMvcResultMatchers.status().isOk());

    // shop workers cannot access customer endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_CUSTOMER_URL, this.shopWorker))
      .andExpect(MockMvcResultMatchers.status().isForbidden());

    // shop owners cannot access customer endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_CUSTOMER_URL, this.shopOwner))
      .andExpect(MockMvcResultMatchers.status().isForbidden());
  }

  @Test
  void shopWorkerAuthorizationWorks() throws Exception {
    // customers cannot access shop worker endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_SHOP_WORKER_URL, this.customer))
      .andExpect(MockMvcResultMatchers.status().isForbidden());

    // shop workers can access shop worker endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_SHOP_WORKER_URL, this.shopWorker))
      .andExpect(MockMvcResultMatchers.status().isOk());

    // shop owners can access shop worker endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_SHOP_WORKER_URL, this.shopOwner))
      .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void shopOwnerAuthorizationWorks() throws Exception {
    // customers cannot access shop owner endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_SHOP_OWNER_URL, this.customer))
      .andExpect(MockMvcResultMatchers.status().isForbidden());

    // shop workers cannot access shop owner endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_SHOP_OWNER_URL, this.shopWorker))
      .andExpect(MockMvcResultMatchers.status().isForbidden());

    // shop owners can access shop owner endpoints
    this.mockMvc.perform(this.buildRequest(MockController.MOCK_SHOP_OWNER_URL, this.shopOwner))
      .andExpect(MockMvcResultMatchers.status().isOk());
  }

  /**
   * Builds a request for a given URL with the access token of a specific user account.
   * 
   * @param url  the URL of where to send the request
   * @param user the user account to generate an access token for
   * 
   * @return a request builder with the access token header set
   */
  private RequestBuilder buildRequest(
      String url,
      UserAccount user
  ) {
    return MockMvcRequestBuilders.get(url).header("Authorization", this.authorizationTestUtility.generateJwt(user));
  }

}

/**
 * Mock controller for testing the authorization annotations.
 */
@Hidden
@RestController
class MockController {

  public static final String MOCK_CUSTOMER_URL = "/api/v1/authorization-mock-customer";
  public static final String MOCK_SHOP_WORKER_URL = "/api/v1/authorization-mock-shop-worker";
  public static final String MOCK_SHOP_OWNER_URL = "/api/v1/authorization-mock-shop-owner";

  @CustomerAuthorization
  @GetMapping(MOCK_CUSTOMER_URL)
  public String mockCustomer() {
    return "customer";
  }

  @ShopWorkerAuthorization
  @GetMapping(MOCK_SHOP_WORKER_URL)
  public String mockShopWorker() {
    return "shop-worker";
  }

  @ShopOwnerAuthorization
  @GetMapping(MOCK_SHOP_OWNER_URL)
  public String mockShopOwner() {
    return "shop-owner";
  }
}
