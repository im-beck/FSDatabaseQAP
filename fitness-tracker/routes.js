const express = require('express');
const router = express.Router();
const db = require('./dal');

// Render index.ejs view with all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await db.getAllWorkouts();
    res.render('index', { workouts });
  } catch (err) {
    console.error('Error fetching workouts', err);
    res.status(500).send('Internal Server Error');
  }
});

// Render a page specifically for workouts
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await db.getAllWorkouts();
    res.render('workouts', { workouts });
  } catch (err) {
    console.error('Error fetching workouts', err);
    res.status(500).send('Internal Server Error');
  }
});

// Render a page for adding a new workout
router.get('/new', async (req, res) => {
    try {
      // Render the new.ejs view for adding a new workout
      res.render('new');
    } catch (err) {
      console.error('Error rendering new workout page', err);
      res.status(500).send('Internal Server Error');
    }
  });  

// Render edit.ejs view for editing a workout
router.get('/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const workout = await db.getWorkoutById(id);
      if (!workout) {
        res.status(404).send('Workout not found');
      } else {
        res.render('edit', { workout });
      }
    } catch (err) {
      console.error('Error fetching workout', err);
      res.status(500).send('Internal Server Error');
    }
  });
  

// GET single workout
router.get('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await db.getWorkoutById(id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
    } else {
      res.json(workout);
    }
  } catch (err) {
    console.error('Error fetching workout', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST new workout
router.post('/workouts', async (req, res) => {
  try {
    const { workout_name, workout_type, duration_minutes, calories_burned, notes } = req.body;
    await db.addWorkout({ workout_name, workout_type, duration_minutes, calories_burned, notes });
    res.redirect('/workouts');
  } catch (err) {
    console.error('Error adding workout', err);
    res.status(500).send('Internal Server Error');
  }
});

// PUT updated workout
router.put('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { workout_name, workout_type, duration_minutes, calories_burned, notes } = req.body;
    await db.updateWorkout(id, { workout_name, workout_type, duration_minutes, calories_burned, notes });
    res.redirect('/workouts');
  } catch (err) {
    console.error('Error updating workout', err);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE workout
router.delete('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteWorkout(id);
    res.redirect('/workouts');
  } catch (err) {
    console.error('Error deleting workout', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;


