package com.ecoBasket.ecobasket.Services;

import com.ecoBasket.ecobasket.Models.Image;
import com.ecoBasket.ecobasket.Repos.ImageRepository;
import com.ecoBasket.ecobasket.AddToCart.Product;
import com.ecoBasket.ecobasket.AddToCart.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.Optional;  

@Service
public class ImageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;

    // Constructor injection of the repositories
    public ImageService(ImageRepository imageRepository, ProductRepository productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }

    // Method to upload an image and associate it with a product
    public String uploadImage(Long productId, MultipartFile file) throws IOException {
        // Retrieving the product by productId
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));  // Ensure Optional is used

        // Ensuring the upload directory exists
        Files.createDirectories(Paths.get(uploadDir));

        // Generating a file name for the image
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        try (InputStream inputStream = file.getInputStream()) {
            BufferedImage originalImage = ImageIO.read(inputStream);

            // Resizing the image 
            BufferedImage resizedImage = new BufferedImage(500, 500, BufferedImage.TYPE_INT_RGB);
            Graphics2D g = resizedImage.createGraphics();
            g.drawImage(originalImage, 0, 0, 500, 500, null);
            g.dispose();

            // Saving the resized image to the file system
            File outputFile = new File(filePath.toString());
            ImageIO.write(resizedImage, "jpg", outputFile);  // Saving as JPG 
        }

        // Creating a new Image object and set its properties
        String imageUrl = "/uploads/" + fileName;  // Storing only the relative path 
        Image image = new Image();
        image.setImageUrl(imageUrl);  // Storing the relative image URL
        image.setProduct(product);  // Linking the image with the product

        // Saving the image record to the database
        imageRepository.save(image);

        // Setting the image URL for the product
        product.setImageUrl(imageUrl);  // Setting the image URL for the product
        productRepository.save(product);  // Saving the updated product with the image URL

        // Return the relative URL of the saved image
        return image.getImageUrl();
    }
}
