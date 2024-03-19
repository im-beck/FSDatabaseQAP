// const express = require('express');
// const methodOverride = require('method-override');
// const routes = require('./routes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride('_method'));
// app.set('view engine', 'ejs');

// // Routes
// app.use('/', routes);
// app.post('/workouts', async (req, res) => {
//   try {
//     const { workout_name, workout_type, duration_minutes, calories_burned, notes } = req.body;

//     // Execute database query to insert new workout
//     await pool.query(
//       'INSERT INTO workouts (workout_name, workout_type, duration_minutes, calories_burned, notes) VALUES ($1, $2, $3, $4, $5)',
//       [workout_name, workout_type, parseInt(duration_minutes), parseInt(calories_burned), notes]
//     );

//     // Redirect to home page or send success response
//     res.redirect('/');
//   } catch (error) {
//     console.error('Error adding new workout:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// // Start server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

const express = require('express');
const methodOverride = require('method-override');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Routes
app.use('/', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

