package com.ecoBasket.ecobasket.Blog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface SavedBlogRepository extends JpaRepository<SavedBlog, Long> {
  Optional<SavedBlog> findByUserIdAndBlog_Id(Long userId, Long blogId); 


  List<SavedBlog> findByUserId(Long userId);      

  void deleteByUserIdAndBlog_Id(Long userId, Long blogId);      
  
  boolean existsByBlog_IdAndUserId(Long blogId, Long userId);

  
  @Query("SELECT sb.blog.id FROM SavedBlog sb WHERE sb.userId = :userId")
  List<Long> findBlogIdsByUserId(@Param("userId") Long userId);
}