package com.studySphere.gradleTest.models;

import lombok.Getter;

import java.util.List;

@Getter
public class UserData {
    private String username;
    private List<Double> dataVector;

    public UserData(String username, List<Double> dataVector) {
        this.username = username;
        this.dataVector = dataVector;
    }

}
