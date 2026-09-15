-- Table: Categories
-- Stores product categories for better organization
CREATE TABLE IF NOT EXISTS categories (
  category_id VARCHAR(10)PRIMARY KEY ,
  name VARCHAR(100) NOT NULL UNIQUE 
);

-- Table: Users
-- Stores user account information, including their type and login credentials
CREATE TABLE IF NOT EXISTS users (
  user_id BIGINT PRIMARY KEY ,
  name VARCHAR(255) NOT NULL ,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT(255),
  user_type ENUM('BUYER','SELLER','BULK_BUYER','BULK_SELLER') NOT NULL DEFAULT "BUYER",
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_type (user_type)
);


--Table: Seller 
--Stores the Seller data 
CREATE TABLE IF NOT EXISTS seller (
    seller_id BIGINT PRIMARY KEY NOT NULL ,
    business_name VARCHAR(255) NOT NULL DEFAULT "xxxxxxxxxxxx" ,
     phone_num VARCHAR(20),
    business_desc TEXT,
    TaxID VARCHAR(255)  DEFAULT "Abcdef",
    user_id BIGINT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: Products
-- Stores product details and links to their categories
CREATE TABLE IF NOT EXISTS products (
  product_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  product_description TEXT,
  price DECIMAL NOT NULL,
  image_url VARCHAR(255),
  category_id VARCHAR(10),
  seller_id BIGINT NOT NULL, 
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  quantity INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 
   FOREIGN KEY (seller_id) REFERENCES seller(seller_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

-- Table: Seller Products
-- Links sellers to their products
CREATE TABLE IF NOT EXISTS seller_products (
  seller_id BIGINT NOT NULL, 
  product_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (seller_id, product_id),
  FOREIGN KEY (seller_id) REFERENCES Seller(seller_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- Table: Content
-- Stores e-learning materials like tutorials and articles
CREATE TABLE IF NOT EXISTS content (
  content_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL, 
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content_type ENUM('video', 'article', 'tutorial') NOT NULL,
  file_url VARCHAR(500), 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: Content Engagement
-- Tracks user interactions with e-learning content
CREATE TABLE IF NOT EXISTS content_engagement (
  engagement_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL, 
  content_id INT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  engagement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (content_id) REFERENCES content(content_id) ON DELETE CASCADE
);

-- Table: Forums
-- Stores user-created forums
CREATE TABLE IF NOT EXISTS forums (
  forum_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: Forum Posts
-- Stores user-created forum posts
CREATE TABLE IF NOT EXISTS forum_posts (
  post_id INT PRIMARY KEY AUTO_INCREMENT,
  forum_id INT NOT NULL,
  user_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (forum_id) REFERENCES forums(forum_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: Forum Comments
-- Stores comments on forum posts
CREATE TABLE IF NOT EXISTS forum_comments (
  comment_id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES forum_posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: Product Reviews
-- Tracks user ratings and reviews for products
CREATE TABLE IF NOT EXISTS product_reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_product_review (user_id, product_id)
);


-- Table: Seller Reviews
-- Tracks user ratings and reviews for sellers
CREATE TABLE IF NOT EXISTS seller_reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  seller_id BIGINT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (seller_id) REFERENCES Seller(seller_id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_seller_review (user_id, seller_id)
);

-- Table: Content Reviews
-- Tracks user ratings and reviews for content
CREATE TABLE IF NOT EXISTS content_reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  content_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (content_id) REFERENCES content(content_id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_content_review (user_id, content_id)
);

-- Table: Locations
-- Stores geographic locations for sellers
CREATE TABLE IF NOT EXISTS locations (
  location_id INT PRIMARY KEY AUTO_INCREMENT,
  seller_id BIGINT NOT NULL, 
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  address VARCHAR(500),
  FOREIGN KEY (seller_id) REFERENCES Seller(seller_id) ON DELETE CASCADE,
  UNIQUE KEY unique_seller_location (seller_id)
);

-- Table: Orders
-- Stores user orders and their details
CREATE TABLE IF NOT EXISTS orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  total_value DECIMAL(10,2) NOT NULL,
  status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') NOT NULL,
  shipping_address VARCHAR(500) NOT NULL,
  payment_intent_id VARCHAR,
  refund_id VARCHAR,
  refund_amount DECIMAL,
  refund_status VARCHAR,
  refund_date TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: Order Items
-- Links orders to their products
CREATE TABLE IF NOT EXISTS order_items (
  order_item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL, 
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL, 
  price_per_unit DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
  UNIQUE KEY unique_order_product (order_id, product_id)
);

-- Table: Cart
-- Stores temporary cart data for users
CREATE TABLE IF NOT EXISTS cart (
  cart_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL, 
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  total_value DECIMAL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_product_cart (user_id, product_id)
);

CREATE TABLE  IF NOT EXISTS Images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    image_url VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Table: Notifications
-- Stores notifications sent to users
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id BIGINT NOT NULL,
    event VARCHAR(255) NOT NULL,
    content TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Table: Messages
-- Stores messaging data between users
CREATE TABLE IF NOT EXISTS messages (
  message_id INT PRIMARY KEY AUTO_INCREMENT, -- Unique ID for each message
  sender_id BIGINT NOT NULL, -- ID of the user who sent the message
  recipient_id BIGINT NOT NULL, -- ID of the user who receives the message
  message_body TEXT NOT NULL, -- The content of the message
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Time the message was sent
  FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE, -- Link sender to users table
  FOREIGN KEY (recipient_id) REFERENCES users(user_id) ON DELETE CASCADE -- Link recipient to users table
);

-- Table: Ratings
-- Stores user ratings and reviews for products
CREATE TABLE IF NOT EXISTS ratings (
  rating_id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique ID for each rating/review entry
  product_id BIGINT NOT NULL,  -- ID of the product being rated
  user_id BIGINT NOT NULL,  -- ID of the user who left the rating/review
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),   -- Rating given by the user (between 1 and 5)
  review TEXT,  -- Optional review text provided by the user
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of when the rating/review was created
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,  -- Links the product to the rating
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE  -- Links the user to the rating
);


CREATE INDEX idx_product_name ON products(name);
CREATE INDEX idx_category_id ON products(category_id);

