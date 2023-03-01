package no.ntnu.webshop.security;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntrypoint implements AuthenticationEntryPoint {

  @Override
  public void commence(
      HttpServletRequest request, 
      HttpServletResponse response, 
      AuthenticationException authException
  ) throws IOException, ServletException {
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(HttpStatus.UNAUTHORIZED.value());

    final var mapper = new ObjectMapper();

    var unauthorizedResponse = Map.of(
      "status", HttpStatus.UNAUTHORIZED.value(),
      "error", HttpStatus.UNAUTHORIZED.getReasonPhrase(),
      "message", authException.getMessage(),
      "path", request.getServletPath()
    );

    response.getOutputStream().write(mapper.writeValueAsBytes(unauthorizedResponse));
  }

}
