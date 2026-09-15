package com.ecoBasket.ecobasket.User_regsitration;

import java.security.Signature;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ecoBasket.ecobasket.Exceptions.InvalidEmailException;
import com.ecoBasket.ecobasket.Exceptions.UserAlreadyExistException;
import com.ecoBasket.ecobasket.Exceptions.UserNotFoundException;
import com.ecoBasket.ecobasket.DTO.NotificationPostDTO;
import com.ecoBasket.ecobasket.Services.NotificationService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class RegistrationController {

    @Autowired
    private UserService userService;
    @Autowired
    private SellerService sellerService;
    @Autowired
    private NotificationService notificationService;




    //UserType=Buyer Registration

    // The user registration occurs in two phases based on the usertype
    //for a normal user i.e BUYER OR BULK_BUYER the "/register" endpoint
    //is used


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequest request,HttpServletResponse response){

        try {
            request.setCreatedAt(Instant.now());
           
            User registeredUser = userService.registerUser(request);

              // Create a notification upon successful registration
              NotificationPostDTO notificationDTO = new NotificationPostDTO(
                registeredUser.getId(), 
                "Welcome to Eco Basket! Your account has been successfully created.", 
                "USER_REGISTRATION"
            );
            notificationService.createNotification(notificationDTO);

            Map<String, Object> responseBody = new HashMap<>();
             responseBody.put("message", "Registered Successfully");


             // This user id will be later on be used in almost everything 
             //Since we didnt implement any  tokanization this process is used
             responseBody.put("userId", registeredUser.getId()); 


            return new ResponseEntity<>(responseBody, HttpStatus.CREATED);

        } catch (UserAlreadyExistException ex) {
            // Return a custom error message if user already exists
            return new ResponseEntity<>(new ErrorResponse("User already exists"), HttpStatus.BAD_REQUEST);
        } catch (InvalidEmailException ex) {
            // Return error for invalid email format
            return new ResponseEntity<>(new ErrorResponse("Invalid email format"), HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            // General error message for unexpected errors
            return new ResponseEntity<>(new ErrorResponse("An error occurred during registration"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Seller-registration
    // if the user is a SELLER or BULK_SELLER, first the normal user data is implemented 
    //to create the user entity and after successfull creation
    //The seller data/information is added to the data base successfully registering 
    // the user 
    @PostMapping("/register_seller")
    public ResponseEntity<?> registerSeller(@RequestBody SellerRegistrationRequest request) {
        try {

              
        Long userId = request.getUserId();
        User user = userService.getUserById(userId);  

        //Explicitly compare the usertype with the enum values and assign the  user type

      
            Seller registeredSeller = sellerService.registerSeller(request);


             // Create a notification upon successful registration
             NotificationPostDTO notificationDTO = new NotificationPostDTO(
                userId, 
                "Welcome to Eco Basket! Your seller account has been successfully created.", 
                "USER_REGISTRATION"
            );
            notificationService.createNotification(notificationDTO);
            Map<String, Object> responseBody = new HashMap<>();
             responseBody.put("message", "Registered  Seller Successfully");


             // The seller id is sent back to the frontend as this id will be user
             //later by  the add product feature.
             responseBody.put("SellerId", registeredSeller.getSellerId());
              
            return new ResponseEntity<>(responseBody, HttpStatus.CREATED);

        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Seller registration failed.");
        }
    }

//UPDATE USER
// This alllows the user to update their information displayed in the Profile page

  @PutMapping("/updateUser")
  public ResponseEntity<User> updateUser( @RequestBody User updatedUserInfo) {
      User updatedUser = userService.updateUser(updatedUserInfo.getId(), updatedUserInfo);
      return ResponseEntity.ok(updatedUser);
  }
}

class ErrorResponse {
    private String message;

    // Constructor
    public ErrorResponse(String message) {
        this.message = message;
    }

    // Getter and Setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}


  

  
