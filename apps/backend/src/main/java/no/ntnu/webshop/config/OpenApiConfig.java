package no.ntnu.webshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.SpecVersion;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
@SecurityScheme(
  name = OpenApiConfig.SECURITY_SCHEME, scheme = "bearer", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER,
  bearerFormat = "JWT", description = "An access token can be obtained through the /v1/auth/sign-in endpoint"
)
public class OpenApiConfig {

  public static final String SECURITY_SCHEME = "JWT Access token";

  @Bean
  OpenAPI openApi() {
    var implementationVersion = this.getClass().getPackage().getImplementationVersion();
    // implementationVersion is null when running in dev mode
    var version = implementationVersion == null ? "dev" : implementationVersion;

    return new OpenAPI()
      .info(
        new Info().title("Webshop API")
          .version(version)
          .description("""
              API for the Webshop project in the courses IDATA2301 and IDATA2306 at [NTNU](https://ntnu.edu).
              <br />
              <br />
              Made by thedatasnok, GBfur and dawsta27.
            """)
          .contact(new Contact().name("GitHub").url("https://github.com/thedatasnok/webshop"))
          .license(new License().name("MIT license").url("https://github.com/thedatasnok/webshop/blob/main/LICENSE"))
      )
      .specVersion(SpecVersion.V31);
  }

}
