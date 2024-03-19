-- Insert a new workout
INSERT INTO workouts (workout_name, workout_type, duration_minutes, calories_burned, notes) 
VALUES ('New Workout', 'Cardio', 45, 400, 'Running on treadmill');

-- Insert a new user
INSERT INTO users (username, password, email) 
VALUES ('new_user', 'new_password', 'new_user@example.com');

-- Insert a new goal for a user
INSERT INTO goals (user_id, goal_name, goal_type, target_value, start_date, end_date, achieved) 
VALUES (2, 'New Goal', 'Distance', 10, '2024-03-01', '2024-03-31', FALSE);
