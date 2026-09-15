package com.ecoBasket.ecobasket.Blog;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_blogs", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "blog_id"}))
public class SavedBlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;

    @Column(name = "saved_at", nullable = false)
    private LocalDateTime saved_at = LocalDateTime.now();

    // Getters and setters
    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public LocalDateTime getSaved_at() {
        return saved_at;
    }

    public void setSaved_at(LocalDateTime saved_at) {
        this.saved_at = saved_at;
    }
}
