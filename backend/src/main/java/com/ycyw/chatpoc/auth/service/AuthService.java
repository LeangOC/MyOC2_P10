package com.ycyw.chatpoc.auth.service;

import com.ycyw.chatpoc.auth.dto.LoginRequest;
import com.ycyw.chatpoc.auth.dto.LoginResponse;
import com.ycyw.chatpoc.auth.exception.InvalidCredentialsException;
import com.ycyw.chatpoc.user.entity.User;
import com.ycyw.chatpoc.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException(
                                "Email ou mot de passe incorrect"
                        ));


        if (!user.getPasswordHash().equals(request.getPassword())) {

            throw new InvalidCredentialsException(
                    "Email ou mot de passe incorrect"
            );
        }

        /*
         * Pour le PoC, nous ne mettons pas encore en place
         * Spring Security + Argon2id.
         *
         * L'authentification réelle sera renforcée dans
         * l'étape sécurité.
         */

        return new LoginResponse(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );
    }
}