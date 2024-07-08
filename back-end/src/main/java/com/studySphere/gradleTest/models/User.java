package com.studySphere.gradleTest.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    private int user_id;
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private Date created_at;
    @Transient
    private Date updated_at;

}
