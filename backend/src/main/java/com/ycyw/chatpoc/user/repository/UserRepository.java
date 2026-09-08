package com.ycyw.chatpoc.user.repository;

import com.ycyw.chatpoc.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findFirstByRole(String role);
}