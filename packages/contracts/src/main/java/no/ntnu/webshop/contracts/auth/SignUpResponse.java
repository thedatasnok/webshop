package no.ntnu.webshop.contracts.auth;

import java.util.UUID;

import lombok.Builder;

@Builder
public record SignUpResponse(
  UUID id,
  String username,
  String email
) {}
