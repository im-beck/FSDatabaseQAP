const express = require('express');
const router = express.Router();
const db = require('./dal');

// Middleware for handling errors
const handleError = (err, res) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
};

// Retrieve all workouts and render index/workouts/deleted view
const renderWorkoutsPage = async (req, res, view) => {
  try {
    const workouts = await db.getAllWorkouts();
    res.render(view, { workouts });
  } catch (err) {
    handleError(err, res);
  }
};

router.get('/', async (req, res) => {
  await renderWorkoutsPage(req, res, 'index');
});

router.get('/workouts', async (req, res) => {
  await renderWorkoutsPage(req, res, 'workouts');
});

router.get('/deleted', async (req, res) => {
  try {
    const deletedWorkouts = await db.getAllDeletedWorkouts();
    res.render('deleted', { deletedWorkouts });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/new', async (req, res) => {
  res.render('new');
});

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
    handleError(err, res);
  }
});

router.post('/workouts', async (req, res) => {
  try {
    const { workout_name, workout_type, duration_minutes, calories_burned, notes } = req.body;
    await db.addWorkout({ workout_name, workout_type, duration_minutes, calories_burned, notes });
    res.redirect('/workouts');
  } catch (err) {
    handleError(err, res);
  }
});

router.post('/workouts/restore/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.restoreWorkout(id);
    res.redirect('/deleted');
  } catch (err) {
    handleError(err, res);
  }
});

router.put('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { workout_name, workout_type, duration_minutes, calories_burned, notes } = req.body;
    await db.updateWorkout(id, { workout_name, workout_type, duration_minutes, calories_burned, notes });
    res.redirect('/workouts');
  } catch (err) {
    handleError(err, res);
  }
});

router.delete('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteWorkout(id);
    res.redirect('/workouts');
  } catch (err) {
    handleError(err, res);
  }
});

router.put('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { workout_name, workout_type, duration_minutes, calories_burned, notes } = req.body;
    await db.updateWorkout(id, { workout_name, workout_type, duration_minutes, calories_burned, notes });
    res.redirect('/workouts');
  } catch (err) {
    handleError(err, res);
  }
});


module.exports = router;
