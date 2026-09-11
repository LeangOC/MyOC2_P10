package com.ycyw.chatpoc.auth.controller;

import com.ycyw.chatpoc.auth.dto.LoginRequest;
import com.ycyw.chatpoc.auth.dto.LoginResponse;
import com.ycyw.chatpoc.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(summary = "Authentifier un utilisateur")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}