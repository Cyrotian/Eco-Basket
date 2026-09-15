package com.ecoBasket.ecobasket.Services;

import com.ecoBasket.ecobasket.AddToCart.Product;
import com.ecoBasket.ecobasket.AddToCart.ProductRepository;
import com.ecoBasket.ecobasket.DTO.InventoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    @Autowired
    private ProductRepository productRepository;

    public List<InventoryDTO> getInventoryBySellerId(Long sellerId) {
        List<Product> products = productRepository.findBySeller_SellerId(sellerId);
        return products.stream().map(product -> new InventoryDTO(
            product.getProduct_id(),
            product.getProductName(),
            product.getProduct_description(),
            product.getPrice(),
            product.getQuantity()
        )).collect(Collectors.toList());
    }
}
