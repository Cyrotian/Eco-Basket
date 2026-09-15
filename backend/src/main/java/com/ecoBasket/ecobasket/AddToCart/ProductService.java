package com.ecoBasket.ecobasket.AddToCart;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecoBasket.ecobasket.Exceptions.CategoryNotFoundException;
import com.ecoBasket.ecobasket.Exceptions.SellerNotFoundException;
import com.ecoBasket.ecobasket.ID_Generator.SnowflakeIdGenerator;
import com.ecoBasket.ecobasket.Repos.CategoryRepository;
import com.ecoBasket.ecobasket.User_regsitration.Seller;
import com.ecoBasket.ecobasket.User_regsitration.SellerRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final SnowflakeIdGenerator idGenerator;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(
        ProductRepository productRepository,
        SnowflakeIdGenerator idGenerator,
        SellerRepository sellerRepository,
        CategoryRepository categoryRepository
    ) {
        this.productRepository = productRepository;
        this.idGenerator = idGenerator;
        this.sellerRepository = sellerRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public Product addProduct(Product product) {
        // Validate and assign category
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            String categoryId = product.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found."));
            product.setCategory(category);
        } else {
            throw new RuntimeException("Category ID must be provided.");
        }

        // Validate and assign seller
        if (product.getSellerId() != null) {
            Long sellerId = product.getSellerId();
            Seller seller = sellerRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new SellerNotFoundException("Seller not found."));
            product.setSeller(seller);
        } else {
            throw new RuntimeException("Seller ID must be provided.");
        }

        // Save and return the product
        return productRepository.save(product);
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Search products by name
    public List<Product> searchProductByName(String keyword) {
        return productRepository.findByProductNameContainingIgnoreCase(keyword);
    }

    // Get paginated products
    public Page<Product> getProductPaginated(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    // Get product by ID
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    // Get products by category with pagination
    public Page<Product> getProductByCategoryPaginated(String category, Pageable pageable) {
        return productRepository.findByCategory_id(category, pageable);
    }



    @Transactional
    public Product increaseInventory(Long productId, int quantity) {
        // Look up the product by ID
        Optional<Product> optProduct = productRepository.findById(productId);
        if (!optProduct.isPresent()) {
            return null;
        }

        Product product = optProduct.get();
        product.setQuantity(product.getQuantity() + quantity);
        // Save and return the updated product
        return productRepository.save(product);
    }

    


    

   
}
