package com.studySphere.gradleTest.rest_controllers;

import com.studySphere.gradleTest.dtos.SimilarityRequest;
import com.studySphere.gradleTest.services.SimilarityService;
import com.studySphere.gradleTest.models.UserData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SimilarityController {

    private final SimilarityService similarityService;

    public SimilarityController(SimilarityService similarityService) {
        this.similarityService = similarityService;
    }

    @PostMapping("/calculate-similarity")
    public ResponseEntity<List<String>> calculateSimilarity(@RequestBody @Validated SimilarityRequest similarityRequest) {

        UserData currentUserData = similarityRequest.getCurrentUserData();
        List<UserData> allUsersData = similarityRequest.getAllUsersData();

        System.out.println("currentUsername: " + currentUserData.getUsername());

        System.out.println("allUsersData: " + allUsersData);

        List<String> sortedUsernames = similarityService.calculateSimilarity(currentUserData, allUsersData);

        return new ResponseEntity<>(sortedUsernames, HttpStatus.OK);
                                        
    }
}
