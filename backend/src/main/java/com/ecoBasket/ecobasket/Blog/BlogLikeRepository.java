package com.ecoBasket.ecobasket.Blog;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.ecoBasket.ecobasket.Blog.BlogLike;

public interface BlogLikeRepository extends JpaRepository<BlogLike, Long> {
    Optional<BlogLike> findByUserIdAndBlogId(Long userId, Long blogId); // Check if a user has already liked a blog
}
