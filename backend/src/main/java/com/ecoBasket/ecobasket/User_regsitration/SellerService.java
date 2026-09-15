package com.ecoBasket.ecobasket.User_regsitration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoBasket.ecobasket.Exceptions.UserNotFoundException;
import com.ecoBasket.ecobasket.ID_Generator.SnowflakeIdGenerator;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SnowflakeIdGenerator idGenerator;

    public Seller registerSeller( SellerRegistrationRequest request) {
        // Step 1: Fetch the existing user
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + request.getUserId()));

        // Step 2: Create the Seller entity with a unique seller ID
        Seller seller = new Seller();
        seller.setSellerId(idGenerator.generateId(2));  // Generate a new seller ID
        seller.setBusinessName(request.getBusinessName());
        seller.setPhoneNumber(request.getPhoneNumber());
        seller.setBusinessDesc(request.getBusinessDesc());
        seller.setUser(user);  // Link to existing User

        // Step 3: Save the Seller entity
        return sellerRepository.save(seller);
    }
}

