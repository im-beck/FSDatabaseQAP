INSERT INTO users (username, password, email) 
VALUES 
('john_doe', 'password123', 'john@example.com'),
('jane_smith', 'pass123', 'jane@example.com'),
('alex_lee', 'abc123', 'alex@example.com');


INSERT INTO workouts (user_id, workout_name, workout_type, duration_minutes, calories_burned, notes) 
VALUES 
(1, 'Morning Run', 'Cardio', 30, 300, 'Ran in the park'),
(1, 'Leg Day', 'Strength Training', 60, 400, 'Squats, lunges, leg presses'),
(2, 'Yoga Session', 'Flexibility', 45, 200, 'Vinyasa flow'),
(2, 'Afternoon Swim', 'Cardio', 45, 500, 'Swam laps in the pool'),
(3, 'HIIT Workout', 'High Intensity Interval Training', 40, 450, 'Burpees, jump squats, mountain climbers');

INSERT INTO goals (user_id, goal_name, goal_type, target_value, start_date, end_date, achieved) 
VALUES 
(1, 'Run 5 miles per week', 'Distance', 5, '2024-03-01', '2024-03-31', FALSE),
(1, 'Lose 5 pounds', 'Weight Loss', 5, '2024-03-01', '2024-03-31', FALSE),
(2, 'Yoga 3 times per week', 'Frequency', 3, '2024-03-01', '2024-03-31', FALSE),
(3, 'Increase bench press by 10%', 'Strength', 10, '2024-03-01', '2024-03-31', FALSE);
