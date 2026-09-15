// package com.ecoBasket.ecobasket.ArranProductCreation;


// import com.ecoBasket.ecobasket.Models.Category;
// import com.ecoBasket.ecobasket.Repos.CategoryRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// @Service
// public class ProductCreationService {

//     private final ProductCreationRepository productRepository;
//     private final CategoryRepository categoryRepository;

//     @Autowired
//     public ProductCreationService(ProductCreationRepository productRepository, CategoryRepository categoryRepository) {
//         this.productRepository = productRepository;
//         this.categoryRepository = categoryRepository;
//     }

//     @Transactional
//     public ProductCreation addProduct(ProductCreation product) {
        
//         product.setSellerId(1);

//         if (product.getCategoryId() != null) {
//             Category category = categoryRepository.findById(product.getCategoryId()).orElse(null);
//             if (category == null) {
//                 throw new RuntimeException("Category not found.");
//             }
//             product.setCategory(category);
//         } else {
//             throw new RuntimeException("Category ID must be provided.");
//         }

        
//         return productRepository.save(product);
//     }
// }