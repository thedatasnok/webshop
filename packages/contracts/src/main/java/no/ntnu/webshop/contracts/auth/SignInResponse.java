package no.ntnu.webshop.contracts.auth;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record SignInResponse(String accessToken) {}
