package com.ecoBasket.ecobasket.User_regsitration;




import java.time.Instant;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="users")

public class User {
   
  @Id
  @Column(name="user_id")
  private Long  id;

  private String name;
  
  @Column(unique=true)
  private String email;

  private String password;

  private String phone;

  private String address;

  @Enumerated(EnumType.STRING)
  @Column (nullable =false )
  private UserType userType;
  
  @OneToOne(mappedBy = "user" , cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private Seller seller;

  @Column (nullable = false, updatable= false,name = "createdAt")
  private Instant createdAt;

  @PrePersist
  protected void onCreaate(){
    this.createdAt=Instant.now();
    this.updatedAt=Instant.now();
  }

   @Column(nullable = false,name = "updatedAt")
   
    private Instant updatedAt;
  @PreUpdate
  protected void onUpdate(){
    this.updatedAt=Instant.now();
  }


}
