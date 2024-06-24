-- Create the users table if it does not exist
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS authors (
    author_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    first_name VARCHAR(70) NOT NULL,
    last_name VARCHAR(70) NOT NULL,
    bio VARCHAR(500),
    pfp VARCHAR(500)
);

-- Create the events table if it does not exist
CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
