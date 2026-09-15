
package com.ecoBasket.ecobasket.Blog;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Getter
@Setter
@Table(name = "blogs")
@AllArgsConstructor
public class Blog {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String content;
    private String category;
    private String imageUrl;
    private String author;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

   
    private int likes;

   
    @OneToMany(mappedBy = "blog")
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    
    @OneToMany(mappedBy = "blog")
    @JsonManagedReference
    private List<BlogLike> blogLikes = new ArrayList<>();

    
    public Blog() {}

    public Blog(String title, String content, String category, String imageUrl, Instant createdAt, Instant updatedAt, String author, int likes) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.author = author;
        this.likes = likes;
    }
}
