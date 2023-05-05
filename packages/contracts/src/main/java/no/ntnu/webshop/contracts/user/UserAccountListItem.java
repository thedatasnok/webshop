package no.ntnu.webshop.contracts.user;

import java.util.Date;
import java.util.UUID;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record UserAccountListItem(
  UUID id,
  String name,
  String email,
  boolean emailVerified,
  String role,
  Date createdAt,
  Long orderCount
) {}
