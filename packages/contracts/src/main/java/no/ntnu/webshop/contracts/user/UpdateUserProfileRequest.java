package no.ntnu.webshop.contracts.user;

import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@GenerateTypeScript
public record UpdateUserProfileRequest(String fullName, String email, String password, String passwordConfirmation) {}
