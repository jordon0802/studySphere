package com.studySphere.gradleTest.services;

import com.studySphere.gradleTest.models.User;
import com.studySphere.gradleTest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.Date;
import java.sql.SQLOutput;
import java.util.Collection;
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

    public int registerNewUserServiceMethod(int user_id, String username, String email, String password) {
        return userRepository.registerNewUser(user_id, username, email, password);
    }

    public Optional<User> findUserByEmail(String email) {
        System.out.println("findUserByEmail Called, email: " + email);
        String user = userRepository.selectUserByEmail(email);
        System.out.println("user: " + user);
        if (user == null) { return Optional.empty(); }
        var User = new User();
        /*User.setUser_id(Integer.parseInt(user.get(0)));
        User.setUsername(user.get(1)); // OR username
        User.setEmail(user.get(2));
        User.setPassword(user.get(3));
        User.setCreated_at(Date.valueOf(user.get(4)));
        User.setUpdated_at(Date.valueOf(user.get(5)));*/

        return Optional.of(User);
    }

    public long nextUserId() {
        // min. value by selectCount = 0; we want first Id to start from 1
        return userRepository.count() + 1;
    }

}
