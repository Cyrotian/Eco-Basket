package com.ecoBasket.ecobasket.Controllers;

import com.ecoBasket.ecobasket.Services.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload/{productId}")
    public ResponseEntity<?> uploadImage(@PathVariable Long productId, @RequestParam("file") MultipartFile file) {
        try {
            
            String imageUrl = imageService.uploadImage(productId, file);
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl, "message", "Image uploaded successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Image upload failed", "details", e.getMessage()));
        }
    }
}