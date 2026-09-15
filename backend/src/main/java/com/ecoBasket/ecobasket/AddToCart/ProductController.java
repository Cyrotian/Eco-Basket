package com.ecoBasket.ecobasket.AddToCart;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecoBasket.ecobasket.Exceptions.CategoryNotFoundException;
import com.ecoBasket.ecobasket.Exceptions.SellerNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping("/product")
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
    
  }

  

  @GetMapping("/product/search")
  public List<Product> searchProductsByName(@RequestParam String keyword) {
    
    return productService.searchProductByName(keyword);
  }

  @GetMapping("/product/page")
  public Page<Product> getPaginatedProducts(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) {
    return productService.getProductPaginated(PageRequest.of(page, size));
  }


  @GetMapping("/product/{product_id}")
public ResponseEntity<Product> getProductById(@PathVariable("product_id") Long product_id) { 
    Product product = productService.getProductById(product_id);
    if (product == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    return ResponseEntity.ok(product);
}

@GetMapping("/product/suggestions")
  public List<Product> getSuggestedProducts(@RequestParam(defaultValue = "10") int limit) {
      List<Product> allProducts = productService.getAllProducts(); // Fetch all products
      Collections.shuffle(allProducts); 
      return allProducts.stream().limit(limit).toList(); 
}
// created by Micheal
@PatchMapping("/api/product/{product_id}/increasestock")
public ResponseEntity<Product> increaseInventory(@PathVariable("product_id") Long product_id, @RequestParam int quantity) {
    Product product = productService.increaseInventory(product_id, quantity);
    if (product == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    return ResponseEntity.ok(product);
}


@GetMapping("/product/category/{category}")
  public Page<Product> getProductByCategory(
    @PathVariable String category,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) {

    PageRequest pageRequest = PageRequest.of(page, size);
    return productService.getProductByCategoryPaginated(category, pageRequest);
  }



//Only for product Creation given by Aaran 
@PostMapping(value = "/api/products", consumes = "application/json", produces = "application/json")
public ResponseEntity<?> addProduct(@RequestBody Product product) {
    try {
        // Call the service to add the product
        Product savedProduct = productService.addProduct(product);
        
        // Return success response with the created product
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    } catch (SellerNotFoundException e) {
        // Return a bad request response when seller is not found
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
    } catch (CategoryNotFoundException e) {
        // Return a bad request response when category is not found
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
    } catch (Exception e) {
        // Return an internal server error for any other issues
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
    }
}



}