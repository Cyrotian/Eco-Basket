package com.ecoBasket.ecobasket.Repos;

import com.ecoBasket.ecobasket.AddToCart.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, String> {  // Use String for category ID type
    Category findByName(String name);  // Fetch Category by its name
}
