// package com.ecoBasket.ecobasket.ArranProductCreation;

// import com.ecoBasket.ecobasket.Models.Image;
// import com.ecoBasket.ecobasket.Models.Category;
// import jakarta.persistence.*;
// import lombok.Getter;
// import lombok.Setter;

// import java.math.BigDecimal;
// import java.util.List;

// @Entity
// @Table(name = "products")
// @Getter
// @Setter
// public class ProductCreation {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "product_id") 
//     private Integer productId;//

//     @Column(name = "seller_id", nullable = false)
//     private Integer sellerId;  //

//     @ManyToOne
//     @JoinColumn(name = "category_id", nullable = false)
//     private Category category;//

//     @Column(name = "name", nullable = false)
//     private String name;//

//     @Column(name = "price", nullable = false)
//     private BigDecimal price;//

//     @Column(name = "description")
//     private String description;//

//     @Column(name = "image_url")
//     private String imageUrl;//

//     @Column(name = "deleted_at")
//     private String deletedAt;//

    
//     @Transient  
//     private Integer categoryId;

//     public Integer getCategoryId() {
//         return category != null ? category.getCategoryId() : null;
//     }

//     @OneToMany(mappedBy = "product")
//     private List<Image> images;

//     public void setCategoryId(Integer categoryId) {
//         if (categoryId != null) {
//             this.category = new Category();
//             this.category.setCategoryId(categoryId);
//         }
//     }
// }