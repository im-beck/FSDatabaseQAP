CREATE TABLE deleted_workouts (
    workout_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    workout_name VARCHAR(100) NOT NULL,
    workout_type VARCHAR(50) NOT NULL,
    duration_minutes INT NOT NULL,
    calories_burned INT NOT NULL,
    notes TEXT,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
