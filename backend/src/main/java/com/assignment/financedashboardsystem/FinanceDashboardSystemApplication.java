package com.assignment.financedashboardsystem;

import com.assignment.financedashboardsystem.entity.User;
import com.assignment.financedashboardsystem.enums.Role;
import com.assignment.financedashboardsystem.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class FinanceDashboardSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinanceDashboardSystemApplication.class, args);
    }
// TODO: check if required
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User admin = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ROLE_ADMIN)
                        .build();
                userRepository.save(admin);
                System.out.println("=========================================================");
                System.out.println("Default Admin Created -> Username: admin | Password: admin123");
                System.out.println("=========================================================");
            }
        };
    }
}