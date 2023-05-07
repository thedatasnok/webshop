package no.ntnu.webshop.security.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import no.ntnu.webshop.config.OpenApiConfig;

/**
 * Annotation for securing methods or classes to authenticated users. This annotation will cause
 * only authenticated requests to be authorized for the annotated method or class.
 * 
 * It will also add the OpenAPI security requirement to the annotated method or class.
 */
@Inherited
@Target({
    ElementType.METHOD, ElementType.TYPE
})
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("isAuthenticated()")
@SecurityRequirement(name = OpenApiConfig.SECURITY_SCHEME)
public @interface AuthenticatedAuthorization {}
