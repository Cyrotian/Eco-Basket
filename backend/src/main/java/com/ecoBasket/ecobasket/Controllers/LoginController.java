
package com.ecoBasket.ecobasket.Controllers;



import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoBasket.ecobasket.User_regsitration.User;
import com.ecoBasket.ecobasket.User_regsitration.UserRepository;
import com.ecoBasket.ecobasket.User_regsitration.UserService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

   
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        // Fetch user details using the UserService
        User user = userService.loginUser(loginRequest);

        // If user is not found or credentials are invalid
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        System.out.println("Returning User ID: " + user.getId()); // Debug log
        // Construct a response map with user details
        Map<String, Object> response = new HashMap<>();
        response.put("userId", user.getId());
        response.put("email", user.getEmail());
        response.put("name", user.getName());
        response.put("phone", user.getPhone());
        response.put("address", user.getAddress());
        response.put("userType", user.getUserType());

        // Return the user data
        if (user.getSeller() != null) {
            response.put("sellerId", user.getSeller().getSellerId());
        } else {
            response.put("sellerId", null);  // If not a seller, return null
        }
        return ResponseEntity.ok(response);
    }
    }

