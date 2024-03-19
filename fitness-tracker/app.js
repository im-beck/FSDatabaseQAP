const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL configuration
const pool = new pg.Pool({
  connectionString: 'host=localhost port=5432 dbname=fitnesstracking user=postgres password=tinybruno1326 sslmode=prefer connect_timeout=10',
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM workouts');
    res.render('index', { workouts: rows });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/workouts', async (req, res) => {
  try {
    const { workout_name, workout_type, duration_minutes, calories_burned, notes } = req.body;
    await pool.query(
      'INSERT INTO workouts (workout_name, workout_type, duration_minutes, calories_burned, notes) VALUES ($1, $2, $3, $4, $5)',
      [workout_name, workout_type, duration_minutes, calories_burned, notes]
    );
    res.redirect('/');
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/workouts/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM workouts WHERE workout_id = $1', [id]);
    res.render('edit', { workout: rows[0] });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { workout_name, workout_type, duration_minutes, calories_burned, notes } = req.body;
    await pool.query(
      'UPDATE workouts SET workout_name = $1, workout_type = $2, duration_minutes = $3, calories_burned = $4, notes = $5 WHERE workout_id = $6',
      [workout_name, workout_type, duration_minutes, calories_burned, notes, id]
    );
    res.redirect('/');
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM workouts WHERE workout_id = $1', [id]);
    res.redirect('/');
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
