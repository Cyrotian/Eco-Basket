// package com.ecoBasket.ecobasket.ArranProductCreation;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @CrossOrigin(origins = "http://localhost:3000")
// @RequestMapping("/api/products")
// public class ProductCreationController {

//     @Autowired
//     private ProductCreationService productService;

//     @PostMapping(consumes = "application/json", produces = "application/json")
//     public ResponseEntity<?> addProduct(@RequestBody ProductCreation product) {
//         try {
//             ProductCreation savedProduct = productService.addProduct(product);
//             return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
            
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
//         }
//     }
// }