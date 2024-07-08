package com.studySphere.gradleTest.rest_controllers;

import com.studySphere.gradleTest.dtos.RegisterUserRequest;
import com.studySphere.gradleTest.security.JwtIssuer;
import com.studySphere.gradleTest.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1"/*, method = RequestMethod.POST*/)
public class RegisterApiController {

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @PostMapping("/user/register")
    public ResponseEntity<HttpStatus> registerNewUser(@RequestBody RegisterUserRequest registerUserRequest) {

        String username = registerUserRequest.getUsername();
        String email = registerUserRequest.getEmail();
        String password = registerUserRequest.getPassword();

        // Check empty fields
        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return new ResponseEntity<>(/*"Please fill in All Fields",*/HttpStatus.BAD_REQUEST);
        }

        // Get UserId
        // int user_id = userService.nextUserId();

        // TokenGeneration (NO NEED?)
        //String token = jwtIssuer.generateToken(user_id, email, "ROLE_USER");

        // Register New User YAY!
        int result = userService.registerNewUserServiceMethod(1, username, email, password);

        if (result != 1) {
            return new ResponseEntity<>(/*"Failed to register User",*/ HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(/*"User registered successfully",*/ HttpStatus.OK);
        }
    }
}
