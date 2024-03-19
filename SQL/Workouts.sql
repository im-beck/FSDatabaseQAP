CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    workout_name VARCHAR(100) NOT NULL,
    workout_type VARCHAR(50) NOT NULL,
    duration_minutes INT NOT NULL,
    calories_burned INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_id ON workouts (user_id);
