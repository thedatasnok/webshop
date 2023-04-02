package no.ntnu.webshop.contracts.utility.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Nullable annotation used to mark a field as nullable. This will also help the TypeScript
 * generator to generate the correct type.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({
    ElementType.TYPE_USE, ElementType.TYPE_PARAMETER
})
public @interface Nullable {}
