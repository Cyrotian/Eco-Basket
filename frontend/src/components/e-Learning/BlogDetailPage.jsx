import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/BlogDetailPage.css";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User is not logged in. No userId found in local storage.");
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchBlogDetails = async () => {
      try {
        const blogResponse = await axios.get(`http://localhost:8080/blogs/${id}`);
        const commentsResponse = await axios.get(`http://localhost:8080/blogs/${id}/comments`);

        setBlog(blogResponse.data);

        const decodedComments = commentsResponse.data.map((comment) => {
          try {
            const decodedContent = JSON.parse(comment.content);
            return { ...comment, content: decodedContent.content };
          } catch (error) {
            console.error("Error parsing comment content:", error);
            return comment;
          }
        });
        setComments(decodedComments);
        setLikes(blogResponse.data.likes);

        // Fetch saved blogs using the POST endpoint
        const savedResponse = await axios.post("http://localhost:8080/blogs/saved", {
          userId: userId,
        });

        if (Array.isArray(savedResponse.data)) {
          const savedBlogIds = savedResponse.data.map(Number);
          setIsSaved(savedBlogIds.includes(Number(id)));
        }

        const likedBlogsResponse = await axios.get(`http://localhost:8080/blogs/liked?userId=${userId}`);
        setHasLiked(likedBlogsResponse.data.includes(Number(id)));
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id, userId]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await axios.post(
        `http://localhost:8080/blogs/${id}/comment`,
        { content: newComment }
      );

      const decodedContent = JSON.parse(response.data.content);
      setComments((prevComments) => [
        ...prevComments,
        { ...response.data, content: decodedContent.content },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;

    try {
      await axios.post(`http://localhost:8080/blogs/${id}/like`, { userId: userId });
      setLikes(likes + 1);
      setHasLiked(true);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleSave = async () => {
    if (!userId) return;

    try {
      if (isSaved) {
        // UNSAVE
        const response = await axios.delete(`http://localhost:8080/blogs/${id}/unsave`, {
          params: { userId: userId },
        });
        if (response.status === 200) {
          setIsSaved(false);
        }
      } else {
        // SAVE
        const response = await axios.post(
          `http://localhost:8080/blogs/${id}/save`,
          {},
          { params: { userId: userId } }
        );
        if (response.status === 200) {
          setIsSaved(true);
        } else {
          console.log("Blog already saved.");
        }
      }
    } catch (error) {
      console.error("Error saving/unsaving the blog:", error);
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-detail-page">
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-author"><strong>Author:</strong> {blog.author}</p>
      <p className="blog-content">{blog.content}</p>

      <div className="like-section">
        <button onClick={handleLike} className="like-button" disabled={hasLiked}>
          👍 Like {likes}
        </button>
      </div>

      <div className="save-section">
        <button onClick={handleSave} className="save-button">
          {isSaved ? "Unsave" : "Save"} Blog
        </button>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment} className="add-comment-button">
          Add Comment
        </button>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <p key={comment.id || comment.content} className="comment">
                💬 {comment.content}
              </p>
            ))
          ) : (
            <p className="no-comments">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
