package no.ntnu.webshop.contracts;

public record ErrorResponse(int statusCode, String code, String message) {}
