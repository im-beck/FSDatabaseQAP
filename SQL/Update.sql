-- Update a workout
UPDATE workouts 
SET workout_name = 'Updated Workout', duration_minutes = 60 
WHERE workout_id = 1;

-- Update a user's email
UPDATE users 
SET email = 'updated_email@example.com' 
WHERE user_id = 1;

-- Update a goal's status
UPDATE goals 
SET achieved = TRUE 
WHERE goal_id = 1;
