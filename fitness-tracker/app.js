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

