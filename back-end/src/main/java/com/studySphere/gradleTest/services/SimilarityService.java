package com.studySphere.gradleTest.services;

import com.studySphere.gradleTest.models.UserData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SimilarityService {

    public List<String> calculateSimilarity(UserData currentUser, List<UserData> allUsers) {
        if (allUsers.isEmpty()) return List.of();

        List<UserData> sortedUsers = new ArrayList<>(allUsers);
        sortedUsers.sort((u1, u2) -> Double.compare(
                cosineSimilarity(currentUser.getDataVector(), u2.getDataVector()),
                cosineSimilarity(currentUser.getDataVector(), u1.getDataVector())
        ));

        List<String> sortedUsernames = new ArrayList<>();
        sortedUsers.forEach(item -> sortedUsernames.add(item.getUsername()));

        return sortedUsernames;
    }

    private double cosineSimilarity(List<Double> vec1, List<Double> vec2) {
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;
        for (int i = 0; i < vec1.size(); i++) {
            dotProduct += vec1.get(i) * vec2.get(i);
            normA += Math.pow(vec1.get(i), 2);
            normB += Math.pow(vec2.get(i), 2);
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

}