package com.ecoBasket.ecobasket.AddToCart;

import java.util.List;

import org.hibernate.annotations.GenericGenerator;

import com.ecoBasket.ecobasket.Models.Image;
import com.ecoBasket.ecobasket.User_regsitration.Seller;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(generator = "productSnowflakeIdGenerator")
    @GenericGenerator(
        name = "productSnowflakeIdGenerator",
        strategy = "com.ecoBasket.ecobasket.ID_Generator.SnowflakeIdGenerator",
        parameters = {
            @org.hibernate.annotations.Parameter(name = "machineId", value = "2")
        }
    )
    @Column(name = "product_id")
    private Long product_id;

    @Column(name = "name")
    private String productName;

    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "seller_id", nullable = false)
    @JsonIgnore  // ✅ Prevents recursion in JSON
    private Seller seller;

    @JsonProperty("seller_id")
    public Long getSellerId() {
        return (seller != null) ? seller.getSellerId() : null;
    }
    
    public String getProductName() {
        return productName;
    }

    @JsonProperty("seller_id")
    public void setSellerId(Long sellerId) {
        if (sellerId != null) {
            this.seller = new Seller();
            this.seller.setSellerId(sellerId);
        }
    }

    private String product_description;

    private Double price;


    private int quantity;

    @Column(name = "image_url")
    private String image_url;

    public void setImageUrl(String imageUrl) {
        this.image_url = imageUrl;
    }

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = true)
    private Category category;

    @Column(nullable = false)
    private boolean isDeleted = false;

    // Prevent infinite recursion when serializing JSON
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // ✅ Works with @JsonBackReference in Image entity
    private List<Image> images;
}
