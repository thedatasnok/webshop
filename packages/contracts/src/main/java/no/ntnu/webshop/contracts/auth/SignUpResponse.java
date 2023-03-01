package no.ntnu.webshop.contracts.auth;

import java.util.UUID;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record SignUpResponse(
  UUID id,
  String fullName,
  String email
) {}
