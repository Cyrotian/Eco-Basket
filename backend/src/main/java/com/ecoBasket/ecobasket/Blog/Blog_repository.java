package com.ecoBasket.ecobasket.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;


@Repository
public interface Blog_repository extends JpaRepository<Blog,Long>{

  List<Blog> findByCategory (String category);


  @Query("SELECT b FROM Blog b WHERE b.id IN (SELECT sb.blog.id FROM SavedBlog sb WHERE sb.userId = :userId)")
  List<Blog> findLikedBlogsByUserId(@Param("userId") Long userId);

}
  

