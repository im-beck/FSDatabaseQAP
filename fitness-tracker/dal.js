const pool = require('./db');

async function getAllWorkouts() {
  try {
    const { rows } = await pool.query('SELECT * FROM workouts');
    return rows;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
}

async function getWorkoutById(id) {
  try {
    const { rows } = await pool.query('SELECT * FROM workouts WHERE workout_id = $1', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching workout by ID:', error);
    throw error;
  }
}

async function addWorkout(workoutData) {
  try {
    const { workout_name, workout_type, duration_minutes, calories_burned, notes } = workoutData;

    await pool.query(
      'INSERT INTO workouts (workout_name, workout_type, duration_minutes, calories_burned, notes) VALUES ($1, $2, $3, $4, $5)',
      [workout_name, workout_type, duration_minutes, calories_burned, notes]
    );

    console.log('Workout added successfully');
  } catch (error) {
    console.error('Error adding workout:', error);
    throw error;
  }
}

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  addWorkout
};


