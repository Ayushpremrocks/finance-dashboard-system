package com.assignment.financedashboardsystem.dto.request;

import com.assignment.financedashboardsystem.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateUserRequest(
        @NotBlank(message = "Username is required") String username,
        @NotBlank(message = "Password is required") String password,
        @NotNull(message = "Role is required") Role role
) {}