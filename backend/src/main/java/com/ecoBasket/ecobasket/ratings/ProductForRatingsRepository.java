package com.ecoBasket.ecobasket.ratings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductForRatingsRepository extends JpaRepository<ProductForRatings, Integer> {
}
