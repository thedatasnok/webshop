package no.ntnu.webshop.security.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.annotation.Secured;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import no.ntnu.webshop.config.OpenApiConfig;
import no.ntnu.webshop.model.UserAccountRole;

/**
 * Annotation for securing methods or classes to shop workers and shop owners. Shop owners are
 * thought of an extension to the permissions of a shop worker, so this annotation is a combination
 * of the two.
 * 
 * It will also add the OpenAPI security requirement to the annotated method or class.
 */
@Inherited
@Target({
    ElementType.METHOD, ElementType.TYPE
})
@Retention(RetentionPolicy.RUNTIME)
@Secured({
    UserAccountRole.Code.SHOP_WORKER, UserAccountRole.Code.SHOP_OWNER
})
@SecurityRequirement(name = OpenApiConfig.SECURITY_SCHEME)
public @interface ShopWorkerAuthorization {}
