-- Create the blog_items table if it does not exist
CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES authors(author_id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    show VARCHAR(50) NOT NULL,
    season VARCHAR(20) NOT NULL,
    episode VARCHAR(50) NOT NULL,
    synopsis TEXT NOT NULL,
    motifs JSONB,
    ui JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
