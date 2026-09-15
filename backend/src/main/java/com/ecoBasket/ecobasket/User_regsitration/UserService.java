package com.ecoBasket.ecobasket.User_regsitration;

import java.time.Instant;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoBasket.ecobasket.Controllers.LoginController.LoginRequest;
import com.ecoBasket.ecobasket.Exceptions.UserNotFoundException;
import com.ecoBasket.ecobasket.ID_Generator.SnowflakeIdGenerator;

@Service
public class UserService {
  

@Autowired
private UserRepository userRepository;

private SnowflakeIdGenerator idGenerator;

@Autowired
private UserService (UserRepository userRepository,SnowflakeIdGenerator idGenerator){
  this.userRepository=userRepository;
  this.idGenerator=idGenerator;
}


public User getUserById(Long id){
  return userRepository.findById(id).map(user->{
    return user;
  })
  .orElseThrow(()-> new UserNotFoundException("User not found with ID: " + id));
}

public User registerUser(RegistrationRequest request){
  User user= new User();

//

  user.setId(idGenerator.generateId(1));
  user.setName(request.getName());
  user.setEmail(request.getEmail());
  user.setPassword(request.getPassword());
  user.setUserType(request.getUserType());
  user.setCreatedAt(request.getCreatedAt());
  user.setUpdatedAt(request.getUpdatedAt());

  
 

  return userRepository.save(user);
  
}

public User updateUser (Long id, User updatedUserInfo){
  User user=userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found with ID:"+id));

  user.setName(updatedUserInfo.getName());
  user.setEmail(updatedUserInfo.getEmail());
  user.setPhone(updatedUserInfo.getPhone());
  user.setAddress(updatedUserInfo.getAddress());
  user.setUpdatedAt(Instant.now());


  return userRepository.save(user);
}

public User loginUser(LoginRequest loginRequest) {
  Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
    
  if (userOptional.isEmpty()) {
      return null;
  }

  User user = userOptional.get();

  // Log the user ID before returning
  System.out.println("Fetched User ID: " + user.getId());

  if (!user.getPassword().equals(loginRequest.getPassword())) {
      return null;
  }
  

  if (user.getSeller() != null) {

      System.out.println("Seller ID: " + user.getSeller().getSellerId());
  }



  return user;
}}
