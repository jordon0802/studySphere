package com.studySphere.gradleTest.services;

import com.studySphere.gradleTest.models.User;
import com.studySphere.gradleTest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.SQLOutput;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@Service
public class UserService {

    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public int registerNewUserServiceMethod(String username, String email, String password, Date createdAt, Date updatedAt) {
        return userRepository.registerNewUser(username, email, password, createdAt, updatedAt);
    }

    public Optional<User> findUserByEmail(String email) {
        System.out.println("findUserByEmail Called, email: " + email);

        User user = new User();

        List<User> userList = (List<User>) userRepository.findAll();
        for (User u : userList) {
            System.out.println("user:" + u.getUsername());
            if (u.getEmail().equals(email)) {
                System.out.println("email: " + u.getEmail());
                user = u;
            }
        }

        return Optional.of(user);
    }

    public long nextUserId() {
        // min. value by selectCount = 0; we want first Id to start from 1
        return userRepository.count() + 1;
    }

}
