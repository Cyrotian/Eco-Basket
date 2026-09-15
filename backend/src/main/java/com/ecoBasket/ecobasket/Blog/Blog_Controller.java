package com.ecoBasket.ecobasket.Blog;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;
import com.ecoBasket.ecobasket.User_regsitration.User;
import com.ecoBasket.ecobasket.User_regsitration.UserRepository;
import com.ecoBasket.ecobasket.Blog.Blog_repository;
import com.ecoBasket.ecobasket.Blog.Blog_Service;
import java.util.Map;


@RestController
@RequestMapping("/blogs")
@CrossOrigin
public class Blog_Controller {

    @Autowired
    private Blog_repository blog_repository;

    @Autowired
    private Comment_repository comment_repository;


    @Autowired
    private SavedBlogRepository savedBlogRepository;

    @Autowired
    private BlogLikeRepository blogLikeRepository; 
    @Autowired
    private UserRepository userRepository;

    // Get all blogs
    @GetMapping
    public List<Blog> getAllBlogs() {
        List<Blog> blogs = blog_repository.findAll();
        blogs.forEach(blog -> blog.setComments(null)); 
        return blogs;
    }

    // Get blogs by category
    @GetMapping("/category/{category}")
    public List<Blog> getBlogByCategory(@PathVariable String category) {
        List<Blog> blogs = blog_repository.findByCategory(category);
        blogs.forEach(blog -> blog.setComments(null)); 
        return blogs;
    }

    // Get a single blog by ID
    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        Optional<Blog> blogOptional = blog_repository.findById(id);
        if (blogOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Blog blog = blogOptional.get();
        blog.setComments(null); 
        return ResponseEntity.ok(blog);
    }

    /////////////////////////////////////////////

    // Get comments for a specific blog by ID
    @GetMapping("/{id}/comments")
    public ResponseEntity<List<Comment>> getCommentsForBlog(@PathVariable Long id) {
        List<Comment> comments = comment_repository.findByBlogId(id); 
        return ResponseEntity.ok(comments);
    }

     // Add a comment to a blog
     @PostMapping("/{id}/comment")
     public ResponseEntity<CommentResponse> addComment(@PathVariable Long id, @RequestBody String commentContent) {
         if (commentContent.trim().isEmpty()) {
             return ResponseEntity.badRequest().body(new CommentResponse(null, "Comment content cannot be empty", id));
         }
 
         Optional<Blog> blogOptional = blog_repository.findById(id);
         if (blogOptional.isEmpty()) {
             return ResponseEntity.notFound().build();
         }
 
         Blog blog = blogOptional.get();
 
        
         Comment comment = new Comment();
         comment.setContent(commentContent);
         comment.setBlog(blog);
         comment_repository.save(comment);
 
      
         return ResponseEntity.ok(new CommentResponse(comment.getId(), comment.getContent(), blog.getId()));
     }
  ////////////////////////////////////////////////////////////////////////////

    // Like a blog
    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeBlog(@PathVariable Long id, @RequestBody LikeRequest likeRequest) {
        Optional<Blog> blogOptional = blog_repository.findById(id);
        if (blogOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
    
        Blog blog = blogOptional.get();
        Long userId = likeRequest.getUserId();
    
        
        Optional<BlogLike> existingLike = blogLikeRepository.findByUserIdAndBlogId(userId, id);
        if (existingLike.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User has already liked this blog.");
        }
    
        
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        User user = userOptional.get();
    
       
        BlogLike blogLike = new BlogLike();
        blogLike.setBlog(blog);
        blogLike.setUser(user); 
        blogLikeRepository.save(blogLike);
        blog.setLikes(blog.getLikes() + 1);
        blog_repository.save(blog);
    
        return ResponseEntity.ok(blog);
    }
    

        @GetMapping("/liked")
    public ResponseEntity<List<Long>> getLikedBlogs(@RequestParam Long userId) {
        
        List<Blog> likedBlogs = blog_repository.findLikedBlogsByUserId(userId); 

        List<Long> likedIds = likedBlogs.stream().map(blog -> blog.getId()).collect(Collectors.toList());
        return ResponseEntity.ok(likedIds);
    }
////////////////////////////////////////////////////////////////
   

  

 //save a blog for a selected user id
 @PostMapping("/{id}/save")
 @Transactional
 public ResponseEntity<String> saveBlog(@PathVariable Long id, @RequestParam Long userId) {
 
     Optional<Blog> blogOptional = blog_repository.findById(id);
     if (blogOptional.isEmpty()) {
         return ResponseEntity.notFound().build();
     }
 
     Optional<SavedBlog> savedBlogOptional = savedBlogRepository.findByUserIdAndBlog_Id(userId, id);
     if (savedBlogOptional.isPresent()) {
         return ResponseEntity.badRequest().body("Blog already saved by the user");
     }
 
     SavedBlog savedBlog = new SavedBlog();
     savedBlog.setUserId(userId);
     savedBlog.setBlog(blogOptional.get());
     savedBlog.setSaved_at(LocalDateTime.now());
 
     savedBlogRepository.save(savedBlog);
 
     return ResponseEntity.ok("Blog saved successfully.");
 }

    //Remove the blog based on the user id that is logged in 
    @DeleteMapping("/{id}/unsave")
    @Transactional
    public ResponseEntity<String> unsaveBlog(@PathVariable Long id, @RequestParam Long userId) {
        if (userId == null) {
            return ResponseEntity.badRequest().body("Missing userId");
        }
        // Delete the saved blog record
        savedBlogRepository.deleteByUserIdAndBlog_Id(userId, id);
        return ResponseEntity.ok("Blog unsaved");
    }

    // Get saved blog details based on the user id for that login session 
    @GetMapping("/saved/details")
    public ResponseEntity<List<Blog>> getSavedBlogDetails(@RequestParam Long userId) {
        List<SavedBlog> savedBlogs = savedBlogRepository.findByUserId(userId);

        List<Blog> blogs = savedBlogs.stream().map(SavedBlog::getBlog).collect(Collectors.toList());

       
        blogs.forEach(blog -> blog.setComments(null));

        return ResponseEntity.ok(blogs);
    }


    @Autowired
    private Blog_Service savedBlogService;

    @PostMapping("/saved")
    public ResponseEntity<List<Long>> getSavedBlogs(@RequestBody Map<String, String> request) {
        String userIdStr = request.get("userId");

        if (userIdStr == null || userIdStr.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Long userId = Long.parseLong(userIdStr);
            List<Long> savedBlogIds = savedBlogService.getSavedBlogIdsByUserId(userId);
            return ResponseEntity.ok(savedBlogIds);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


}
