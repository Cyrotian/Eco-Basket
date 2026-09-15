package com.ecoBasket.ecobasket.Blog;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100000) // Adjust length as needed for your comments
    private String content;

    @ManyToOne // Many comments belong to one blog
    private Blog blog;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    public Comment() {}

    public Comment(String content, Blog blog) {
        this.content = content;
        this.blog = blog;
    }
}
