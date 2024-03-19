const pool = require('./db');

async function getAllWorkouts() {
  try {
    const { rows } = await pool.query('SELECT * FROM workouts');
    return rows;
  } catch (error) {
    handleDatabaseError('Error fetching workouts:', error);
  }
}

async function getWorkoutById(id) {
  try {
    const { rows } = await pool.query('SELECT * FROM workouts WHERE workout_id = $1', [id]);
    return rows[0];
  } catch (error) {
    handleDatabaseError('Error fetching workout by ID:', error);
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
    handleDatabaseError('Error adding workout:', error);
  }
}

async function deleteWorkout(id) {
  try {
    const workout = await getWorkoutById(id);
    if (!workout) {
      throw new Error('Workout not found');
    }
    
    await pool.query(
      'INSERT INTO deleted_workouts (workout_id, user_id, workout_name, workout_type, duration_minutes, calories_burned, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [workout.workout_id, workout.user_id, workout.workout_name, workout.workout_type, workout.duration_minutes, workout.calories_burned, workout.notes]
    );

    await pool.query('DELETE FROM workouts WHERE workout_id = $1', [id]);
  } catch (error) {
    handleDatabaseError('Error deleting workout:', error);
  }
}

async function restoreWorkout(id) {
  try {
    const deletedWorkout = await getDeletedWorkoutById(id);
    if (!deletedWorkout) {
      throw new Error('Deleted workout not found');
    }
    
    await pool.query(
      'INSERT INTO workouts (workout_id, user_id, workout_name, workout_type, duration_minutes, calories_burned, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [deletedWorkout.workout_id, deletedWorkout.user_id, deletedWorkout.workout_name, deletedWorkout.workout_type, deletedWorkout.duration_minutes, deletedWorkout.calories_burned, deletedWorkout.notes]
    );

    await pool.query('DELETE FROM deleted_workouts WHERE workout_id = $1', [id]);
  } catch (error) {
    handleDatabaseError('Error restoring workout:', error);
  }
}

async function getAllDeletedWorkouts() {
  try {
    const { rows } = await pool.query('SELECT * FROM deleted_workouts');
    return rows;
  } catch (error) {
    handleDatabaseError('Error fetching deleted workouts:', error);
  }
}

async function getDeletedWorkoutById(id) {
  try {
    const { rows } = await pool.query('SELECT * FROM deleted_workouts WHERE workout_id = $1', [id]);
    return rows[0];
  } catch (error) {
    handleDatabaseError('Error fetching deleted workout by ID:', error);
  }
}

function handleDatabaseError(message, error) {
  console.error(message, error);
  throw error;
}

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  addWorkout,
  deleteWorkout,
  getAllDeletedWorkouts,
  restoreWorkout,
  getDeletedWorkoutById
};
