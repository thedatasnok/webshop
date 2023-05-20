package no.ntnu.webshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import no.ntnu.webshop.repository.UserAccountJpaRepository;
import no.ntnu.webshop.security.AuthenticationRequestFilter;
import no.ntnu.webshop.security.UserAccountDetailsAdapter;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig {
  private final UserAccountJpaRepository userAccountRepository;
  private final AuthenticationRequestFilter authenticationRequestFilter;

  @Bean
  public PasswordEncoder getPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration
  ) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    var provider = new DaoAuthenticationProvider();

    provider.setUserDetailsService(
      username -> new UserAccountDetailsAdapter(
        this.userAccountRepository.findByEmail(username)
          .orElseThrow(() -> new UsernameNotFoundException("Could not find user account with username: " + username))
      )
    );

    provider.setPasswordEncoder(this.getPasswordEncoder());

    return provider;
  }

  @Bean
  public SecurityFilterChain webSecurityCustomizer(
      HttpSecurity httpSecurity
  ) throws Exception {
    httpSecurity.csrf(csrf -> csrf.disable())
      .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      // by default we permit all requests, but we can override this by using annotation on each endpoint
      .authorizeHttpRequests(authorize -> authorize.requestMatchers("/**").permitAll().anyRequest().authenticated());

    httpSecurity.addFilterBefore(this.authenticationRequestFilter, UsernamePasswordAuthenticationFilter.class);

    return httpSecurity.build();
  }

}
