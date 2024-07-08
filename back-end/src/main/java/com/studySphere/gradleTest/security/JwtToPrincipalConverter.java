package com.studySphere.gradleTest.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtToPrincipalConverter {
    public UserPrincipal convert(DecodedJWT decodedJWT) {
        return UserPrincipal.builder()
                .user_id(Integer.parseInt(decodedJWT.getSubject()))
                .username(decodedJWT.getSubject())
                .email(decodedJWT.getClaim("e").asString())
                .authorities(extractAuthoritiesFromClaim(decodedJWT))
                .build();
    }

    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT decodedJWT) {
        var claim = decodedJWT.getClaim("a");
        if (claim.isNull() || claim.isMissing()) return List.of();
        // Claim notNull or notMissing
        return claim.asList(SimpleGrantedAuthority.class);
    }
}
