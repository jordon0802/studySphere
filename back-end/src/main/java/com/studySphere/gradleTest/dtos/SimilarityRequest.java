package com.studySphere.gradleTest.dtos;

import com.studySphere.gradleTest.models.UserData;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SimilarityRequest {

    private UserData currentUserData;
    private List<UserData> allUsersData;

}
