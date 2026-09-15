CREATE TABLE blogs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    author VARCHAR(100),
    image_url VARCHAR(255),
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO   blogs (title, content, category, author, image_url, created_at, updated_at) VALUES
('The Basics of Recycling', 'Recycling is one of the easiest ways to reduce waste and protect the environment. By properly sorting recyclable materials such as paper, plastic, glass, and metal, we can significantly cut down on landfill waste. Many materials can be repurposed and reused, saving resources and energy. To make a difference, always check local recycling guidelines, clean your recyclables before disposal, and opt for products made from recycled materials.', 'Recycling', 'John Doe', 'https://example.com/recycling1.jpg', NOW(), NOW()),
('How to Reduce Food Waste at Home', 'Food waste is a major environmental issue that contributes to methane emissions in landfills. You can reduce waste by planning meals ahead of time, storing food properly, and using leftovers creatively. Composting food scraps can also be an effective way to return nutrients to the soil. Making small changes in our daily habits can have a significant impact on reducing food waste.', 'Food Waste', 'Jane Smith', 'https://example.com/foodwaste1.jpg', NOW(), NOW()),
('Eco-Friendly Living Tips', 'Living an eco-friendly lifestyle doesn’t have to be difficult. Simple changes like using reusable bags, switching to energy-efficient appliances, and consuming organic food can make a difference. Organic food reduces pesticide use, which is better for the environment and human health. Supporting sustainable brands and reducing single-use plastics are also important steps toward a greener lifestyle.', 'Eco-Friendly Living', 'Emily Green', 'https://example.com/ecoliving1.jpg', NOW(), NOW()),
('Composting: A Beginner’s Guide', 'Composting is an excellent way to recycle food scraps and garden waste into nutrient-rich soil. It helps reduce landfill waste and improves soil health. To start, collect fruit and vegetable scraps, coffee grounds, and eggshells. Avoid adding meat, dairy, and oily foods. Regularly turning the compost helps speed up decomposition, creating a rich organic fertilizer for plants.', 'Recycling', 'Mark White', 'https://example.com/composting.jpg', NOW(), NOW()),
('Organic Food vs. Conventional Food', 'Organic food is grown without synthetic pesticides, fertilizers, or genetically modified organisms (GMOs). It is better for the environment because it promotes biodiversity and reduces pollution. While organic food can be more expensive, the health benefits and environmental impact make it a worthwhile choice. Look for certified organic labels to ensure you’re purchasing genuine organic products.', 'Eco-Friendly Living', 'Laura Brown', 'https://example.com/organicfood.jpg', NOW(), NOW());


CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    blog_id BIGINT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);




