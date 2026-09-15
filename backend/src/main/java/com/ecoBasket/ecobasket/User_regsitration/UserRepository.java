package com.ecoBasket.ecobasket.User_regsitration;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User,Long>{
  Optional<User> findByEmail(String email);

boolean existsById(int id);

}


