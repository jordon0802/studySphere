package com.studySphere.gradleTest.rest_controllers;

import com.studySphere.gradleTest.dtos.LoginUserRequest;
import com.studySphere.gradleTest.dtos.LoginUserResponse;
import com.studySphere.gradleTest.models.User;
import com.studySphere.gradleTest.security.CustomUserDetailService;
import com.studySphere.gradleTest.security.JwtIssuer;
import com.studySphere.gradleTest.security.UserPrincipal;
import com.studySphere.gradleTest.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class LoginApiController {

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;

    @Autowired
    CustomUserDetailService userService;

    @PostMapping("/user/login")
    public ResponseEntity<String[]> loginUser (@RequestBody @Validated LoginUserRequest loginUserRequest) {
        String email = loginUserRequest.getEmail();
        String password = loginUserRequest.getPassword();

        ResponseEntity<String[]> response;
        // {Error Message/user_id, username, token}
        String[] body = new String[3];

        if (email.isEmpty() || password.isEmpty()) {
            body[0] = "Please fill in All Fields.";
            body[1] = "";
            body[2] = "";
            response = new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
            return response;
        }

        UserPrincipal principal = userService.loadUserByUsername(email);

        /*var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );*/

        // ??
        System.out.println("Before setAuthentication");
        /*SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal) authentication.getPrincipal();*/

        // User Principal exists if found in database, else principal == null

        System.out.println("Principal username: " + principal.getUsername());

        if (principal.getUsername() == null) {
            body[0] = "User not found";
            body[1] = "";
            body[2] = "";
            response = new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
            return response;
        }

        if (principal.getEmail().equals(email) && password.equals(principal.getPassword())) {
            var role = principal.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            var token = jwtIssuer.generateToken(principal.getUser_id(), principal.getEmail(), role);

            body[0] = Integer.toString(principal.getUser_id());
            body[1] = principal.getUsername();
            body[2] = token;
            response = new ResponseEntity<>(body, HttpStatus.OK);
        } else {
            body[0] = "Invalid Password";
            body[1] = "";
            body[2] = "";
            response = new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    @GetMapping("/testing")
    public String secured() {
        return "testing secured";
    }

}
