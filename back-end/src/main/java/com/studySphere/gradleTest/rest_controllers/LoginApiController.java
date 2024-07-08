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
    public LoginUserResponse loginUser (@RequestBody @Validated LoginUserRequest loginUserRequest) {
        String email = loginUserRequest.getEmail();
        String password = loginUserRequest.getPassword();

        UserPrincipal principal = userService.loadUserByUsername(email);

        System.out.println("Email: " + email + "\nPassword: " + password);
        /*var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );*/

        // ??
        System.out.println("Before setAuthentication");
        /*SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal) authentication.getPrincipal();*/

        var role = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var token = jwtIssuer.generateToken(principal.getUser_id(), principal.getEmail(), role);

        // Check empty fields??

        return LoginUserResponse.builder()
                .accessToken(token)
                .build();

        /*List<User> userList = UserService.fetchUserList();

        int len = userList.size();

        for (User user : userList) {
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                return new ResponseEntity<>("Successful Login",HttpStatus.OK);
            }
        }*/

        //return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/testing")
    public String secured() {
        return "testing secured";
    }

}
