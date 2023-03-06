package no.ntnu.webshop.security;

import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import no.ntnu.webshop.model.UserAccount;

public class UserAccountDetailsAdapter implements UserDetails {
  private UserAccount userAccount;
  private boolean enabled;

  public UserAccountDetailsAdapter(
      UserAccount userAccount
  ) {
    this.userAccount = userAccount;
    // TODO: Reflect on this, do we want to disable accounts?
    this.enabled = true;
  }

  public UserAccount getUserAccount() {
    return this.userAccount;
  }

  @Override
  public String getUsername() {
    return this.userAccount.getEmail();
  }

  @Override
  public String getPassword() {
    return this.userAccount.getPassword();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Set.of(new SimpleGrantedAuthority(this.userAccount.getRole().toString()));
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return this.enabled;
  }

  @Override
  public boolean isEnabled() {
    return this.enabled;
  }

  @Override
  public boolean isAccountNonExpired() {
    return this.enabled;
  }

  @Override
  public boolean isAccountNonLocked() {
    return this.enabled;
  }

}
