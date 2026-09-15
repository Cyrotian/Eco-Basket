package com.ecoBasket.ecobasket.User_regsitration;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table(name = "seller")
@Getter
@Setter
public class Seller {

  @Id
  @Column(name="seller_id")
 
  private Long sellerId;

  @Column(name = "business_name")
  private String BusinessName;

  @Column(name = "phone_num")
  private String PhoneNumber;
  @Column(name = "business_desc")
  private String BusinessDesc;
  
  private String TaxID;

@OneToOne
@JoinColumn(name="user_id",unique = true)
  private User user;
}
