import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../css/LearningHomePage.css";

export default function LearningHomePage() {
  const [blogs, setBlogs] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [savedBlogs, setSavedBlogs] = useState(new Set());
  const [comments, setComments] = useState({});
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState(""); 

  const userId = localStorage.getItem("userid");

  

  const fetchBlogs = async () => {
    try {
      const response = selectedCategory
        ? await axios.get(`http://localhost:8080/blogs/category/${selectedCategory}`)
        : await axios.get("http://localhost:8080/blogs");

      if (Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        console.error("Received data is not an array:", response.data);
        setBlogs([]); 
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); 
    }
  };

  const fetchSavedBlogs = async () => {
    const userId = localStorage.getItem("userid");
  
    if (!userId || userId === "undefined") {
      console.error("User ID is not valid:", userId);
      return;
    }
  
    try {
      
      const response = await axios.post("http://localhost:8080/blogs/saved", {
        userId: userId
      });
      
      console.log(response.data);
      if (response.data) {
        setSavedBlogs(new Set(response.data));
      } else {
        console.error("No saved blogs found.");
      }
    } catch (error) {
      console.error("Error fetching saved blogs:", error);
    }
  };

  const handleLike = async (blogId, userId, e) => {
    e.stopPropagation(); 

    if (likedBlogs.has(blogId)) return; 
    try {
        setLikedBlogs((prev) => new Set(prev.add(blogId))); 

        await axios.post(`http://localhost:8080/blogs/${blogId}/like`, { userId: userId });

        const updatedBlogResponse = await axios.get(`http://localhost:8080/blogs/${blogId}`);
        const updatedBlog = updatedBlogResponse.data;

        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
                blog.id === blogId ? { ...blog, likes: updatedBlog.likes } : blog
            )
        );
    } catch (error) {
        console.error("Error liking the blog:", error);
    }
};

  const handleSaveBlog = async (blogId, e) => {
    e.stopPropagation();
    try {
      if (savedBlogs.has(blogId)) {
        // Unsaving the blog
        await axios.delete(`http://localhost:8080/blogs/${blogId}/unsave?userId=${userId}`);
        setSavedBlogs((prev) => {
          const newSaved = new Set(prev);
          newSaved.delete(blogId);  
          return newSaved;
        });
      } else {
        // Saving the blog
        const response = await axios.post(`http://localhost:8080/blogs/${blogId}/save?userId=${userId}`);
        if (response.status === 200) {
          setSavedBlogs((prev) => new Set(prev).add(blogId)); 
        } else if (response.data === "Blog already saved by the user") {
          console.log("Blog is already saved by the user.");
        }
      }
    } catch (error) {
      console.error("Error saving/unsaving blog:", error);
    }
  };

  const handleAddComment = async (blogId, comment, e) => {
    e.stopPropagation();
    if (comment.trim() === "") return;

    try {
      const encodedComment = encodeURIComponent(comment); 

      const response = await axios.post(
        `http://localhost:8080/blogs/${blogId}/comment`,
        { content: encodedComment }
      );

      const commentContent = response.data.content;
      const parsedContent = commentContent ? JSON.parse(commentContent) : { content: commentContent };

      setComments((prevComments) => {
        return {
          ...prevComments, 
          [blogId]: [...(prevComments[blogId] || []), parsedContent] 
        };
      });

      setNewComment(""); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const categories = ["All", "Recycling Tips", "Food Waste", "Eco-Friendly Living"];

  const handleBlogClick = (blogId, e) => {
    e.stopPropagation(); 
    navigate(`/blog/${blogId}`);
  };




  useEffect(() => {
    fetchBlogs();
    fetchSavedBlogs();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Learn About Recycling</h1>

      <div className="filter-section">
        <label>Filter by Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category, index) => (
            <option key={index} value={category === "All" ? "" : category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="blog-container">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div
                className="blog-content"
                onClick={(e) => handleBlogClick(blog.id, e)} 
              >
                <h2>{blog.title}</h2>
                <p><strong>Author:</strong> {blog.author}</p>
                <p>{blog.content}</p>
              </div>

              <button
                onClick={(e) => handleLike(blog.id, userId, e)} 
                className="like-btn"
              >
                👍 {blog.likes}
              </button>

              <button
                onClick={(e) => handleSaveBlog(blog.id, e)} 
                className="save-btn"
              >
                {savedBlogs.has(blog.id) ? "Unsave" : "Save"}
              </button>

              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddComment(blog.id, e.target.value, e);
                      e.target.value = ""; 
                    }
                  }}
                />
               <div className="comments">
                 {(comments[blog.id] || []).map((comment, index) => (
                  <p key={index} className="comment">💬 {comment.content}</p>
                ))}
                  </div>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
}
