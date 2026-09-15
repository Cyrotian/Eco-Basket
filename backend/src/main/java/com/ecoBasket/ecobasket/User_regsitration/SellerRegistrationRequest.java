package com.ecoBasket.ecobasket.User_regsitration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerRegistrationRequest {
  

  private Long userId;
  private String businessName;
  private String phoneNumber;
  private String businessDesc;
}
