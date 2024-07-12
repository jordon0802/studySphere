package com.studySphere.gradleTest.repository;

import com.studySphere.gradleTest.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@CrossOrigin
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO USERS(username, email, password, created_at, updated_at) " +
            "VALUES(:username, :email, :password, :created_at, :updated_at)",
            nativeQuery = true)
    int registerNewUser(@Param("username") String username,
                        @Param("email") String email,
                        @Param("password") String password,
                        @Param("created_at") Date createdAt,
                        @Param("updated_at") Date updatedAt);

    /*@Transactional
    @Query(value = "SELECT * FROM users WHERE email = :email")
    List<User> selectUserByEmail (@Param("email") String email);*/

    @Transactional
    @Query(value = "SELECT COUNT(*) FROM users", nativeQuery = true)
    int selectCount();

}
