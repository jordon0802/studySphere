package com.studySphere.gradleTest.dtos;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginUserResponse {

    private final String accessToken;

}
