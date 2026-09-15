package com.ecoBasket.ecobasket.Blog;

public class CommentResponse {
    private Long commentId;
    private String content;
    private Long blogId;

    public CommentResponse(Long commentId, String content, Long blogId) {
        this.commentId = commentId;
        this.content = content;
        this.blogId = blogId;
    }

    // Getters and Setters
    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getBlogId() {
        return blogId;
    }

    public void setBlogId(Long blogId) {
        this.blogId = blogId;
    }
}
