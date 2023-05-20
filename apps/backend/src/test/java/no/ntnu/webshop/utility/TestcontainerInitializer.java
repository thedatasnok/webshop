package no.ntnu.webshop.utility;

import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.lifecycle.Startables;

/**
 * Application context initializer that starts a PostgreSQL container and sets the datasource
 * properties accordingly. This replaces the default datasource with a datasource that connects to
 * the PostgreSQL container.
 */
class TestcontainerInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:alpine").withDatabaseName("webshop")
    .withUsername("webshop")
    .withPassword("webshop");

  static {
    Startables.deepStart(postgres).join();
  }

  @Override
  public void initialize(
      ConfigurableApplicationContext ctx
  ) {
    TestPropertyValues
      .of(
        "spring.datasource.url=" + postgres.getJdbcUrl(),
        "spring.datasource.username=" + postgres.getUsername(),
        "spring.datasource.password=" + postgres.getPassword()
      )
      .applyTo(ctx.getEnvironment());
  }

}
