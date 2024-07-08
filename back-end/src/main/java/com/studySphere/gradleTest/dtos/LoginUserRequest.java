package com.studySphere.gradleTest.dtos;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginUserRequest {

    private String email;
    private String password;

}
