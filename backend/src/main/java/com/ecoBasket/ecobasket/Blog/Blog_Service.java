package com.ecoBasket.ecobasket.Blog;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class Blog_Service {

@Autowired
  private Blog_repository blog_repository;

  public List <Blog> getAllBlogs(){
    return blog_repository.findAll();
  }
  public List<Blog> getBlogsByCategory (String category){
    return blog_repository.findByCategory(category);
  }  

  @Autowired
    private SavedBlogRepository savedBlogRepository;

    @Transactional
    public void unsaveBlog(Long userId, Long blogId) {
        savedBlogRepository.deleteByUserIdAndBlog_Id(userId, blogId);
    }
    
    public List<Long> getSavedBlogIdsByUserId(Long userId) {
      return savedBlogRepository.findBlogIdsByUserId(userId);
  }

  


}
