CREATE TABLE saved_products (
    user_id BIGINT,
    product_id BIGINT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);
CREATE TABLE saved_blogs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    blog_id BIGINT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_saved_blog_blog FOREIGN KEY (blog_id) REFERENCES blogs(id),
    UNIQUE (user_id, blog_id)
);

CREATE TABLE blog_likes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,               
    blog_id BIGINT NOT NULL,                             
    user_id BIGINT NOT NULL,                             
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,  
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,   
    UNIQUE (blog_id, user_id)                            
);


CREATE INDEX idx_blog_user ON blog_likes(blog_id, user_id);