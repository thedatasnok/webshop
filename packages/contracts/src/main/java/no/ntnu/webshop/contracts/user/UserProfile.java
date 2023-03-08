package no.ntnu.webshop.contracts.user;

import java.util.Date;
import java.util.UUID;

import lombok.Builder;
import no.ntnu.webshop.contracts.utility.annotation.GenerateTypeScript;

@Builder
@GenerateTypeScript
public record UserProfile(
    UUID id,
    String fullName,
    String email,
    Boolean emailVerified,
    String role,
    Date createdAt
) {}
