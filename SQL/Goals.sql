CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    goal_name VARCHAR(100) NOT NULL,
    goal_type VARCHAR(50) NOT NULL,
    target_value NUMERIC NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    achieved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_id_goals ON goals (user_id);

