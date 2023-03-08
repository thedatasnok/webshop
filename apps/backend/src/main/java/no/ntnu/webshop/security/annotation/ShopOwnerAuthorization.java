package no.ntnu.webshop.security.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.annotation.Secured;

import no.ntnu.webshop.model.UserAccountRole;

/**
 * Annotation for securing methods or classes to shop owners. This annotation is used to mark
 * methods or classes as only accessible to shop owners.
 */
@Inherited
@Target({
    ElementType.METHOD, ElementType.TYPE
})
@Retention(RetentionPolicy.RUNTIME)
@Secured(UserAccountRole.Code.SHOP_OWNER)
public @interface ShopOwnerAuthorization {}
