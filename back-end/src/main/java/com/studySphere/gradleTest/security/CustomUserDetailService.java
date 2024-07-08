package com.studySphere.gradleTest.security;

import com.studySphere.gradleTest.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserPrincipal loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername Called");

        // User user
        var user = userService.findUserByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(email));

        return UserPrincipal.builder()
                .user_id(user.getUser_id())
                .username(user.getUsername())
                .email(user.getEmail())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER")))
                .password(user.getPassword())
                .build();
    }
}
