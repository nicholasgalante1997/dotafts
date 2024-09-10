CREATE TABLE IF NOT EXISTS authors (
    author_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    first_name VARCHAR(70) NOT NULL,
    last_name VARCHAR(70) NOT NULL,
    bio VARCHAR(500),
    pfp VARCHAR(500)
);
