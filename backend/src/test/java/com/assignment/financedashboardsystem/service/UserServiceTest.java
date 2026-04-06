package com.assignment.financedashboardsystem.service;

import com.assignment.financedashboardsystem.dto.request.CreateUserRequest;
import com.assignment.financedashboardsystem.entity.User;
import com.assignment.financedashboardsystem.enums.Role;
import com.assignment.financedashboardsystem.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("Should successfully create a new user")
    void createUser_Success() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest("newuser", "password123", Role.ROLE_ANALYST);

        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword");

        User savedUser = User.builder()
                .username("newuser")
                .password("hashedPassword")
                .role(Role.ROLE_ANALYST)
                .build();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Act
        User result = userService.createUser(request);

        // Assert
        assertNotNull(result);
        assertEquals("newuser", result.getUsername());
        assertEquals("hashedPassword", result.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Should throw exception when username is already taken")
    void createUser_DuplicateUsername_ThrowsException() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest("admin", "password", Role.ROLE_ADMIN);
        when(userRepository.existsByUsername("admin")).thenReturn(true);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> userService.createUser(request)
        );

        assertEquals("Username already exists", exception.getMessage());
        verify(userRepository, never()).save(any(User.class)); // Ensures save was never called
    }
}