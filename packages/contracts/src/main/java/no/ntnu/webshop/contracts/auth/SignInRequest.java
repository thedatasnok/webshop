package no.ntnu.webshop.contracts.auth;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record SignInRequest(
  String email,
  String password
) {}
