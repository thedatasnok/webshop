package no.ntnu.webshop.security.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.annotation.Secured;

import no.ntnu.webshop.model.UserAccountRole;

/**
 * Annotation for securing methods or classes to shop workers and shop owners. Shop owners are
 * thought of an extension to the permissions of a shop worker, so this annotation is a combination
 * of the two.
 */
@Inherited
@Target({
    ElementType.METHOD, ElementType.TYPE
})
@Retention(RetentionPolicy.RUNTIME)
@Secured({
    UserAccountRole.Code.SHOP_WORKER, UserAccountRole.Code.SHOP_OWNER
})
public @interface ShopWorkerAuthorization {}
