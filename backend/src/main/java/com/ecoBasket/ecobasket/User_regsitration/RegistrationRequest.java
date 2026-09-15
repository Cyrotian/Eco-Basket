package com.ecoBasket.ecobasket.User_regsitration;

import java.time.Instant;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class RegistrationRequest {
  @NotBlank
  private String name;

  @Email
  @NotBlank
  private String email;

  @NotBlank
  private String password;

  private UserType userType;

 
  public Instant createdAt;
  public Instant updatedAt;


  

  private String BusinessName;
  private String phoneNumber;
  private String BusinessDesc;

  public Instant getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
}

public    Instant getUpdatedAt(){
    return updatedAt;
}

public void setUpdatedAt( Instant updatedAt){
    this.updatedAt = updatedAt;
}

  
}
