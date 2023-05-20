package no.ntnu.webshop.utility;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.test.context.ContextConfiguration;

/**
 * Annotation used to mark a test class that needs to have test containers running before the
 * test(s) can be executed.
 */
@Target({
    ElementType.TYPE
})
@Retention(RetentionPolicy.RUNTIME)
@ContextConfiguration(initializers = TestcontainerInitializer.class)
public @interface EnableTestcontainers {}
