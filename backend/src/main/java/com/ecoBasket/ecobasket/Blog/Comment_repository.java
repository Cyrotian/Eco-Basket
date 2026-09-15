package com.ecoBasket.ecobasket.Blog;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Comment_repository extends JpaRepository<Comment, Long> {
   

  List<Comment> findByBlogId(Long blogId);
}
