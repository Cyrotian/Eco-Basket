package com.ecoBasket.ecobasket.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoBasket.ecobasket.AddToCart.Category;
import com.ecoBasket.ecobasket.Repos.CategoryRepository;

import java.util.List;
import java.util.logging.Logger;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private static final Logger logger = Logger.getLogger(CategoryService.class.getName());

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Fetch all categories
    public List<Category> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        logger.info("Fetched categories: " + categories.toString());
        return categories;
    }

    // Fetch category by name
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);  // Fetch category by name
    }
}
