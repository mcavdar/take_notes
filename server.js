const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL client setup
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'user', // replace with your database username
  password: 'pass', // replace with your database password
  database: 'textdb',
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.log('Error connecting to PostgreSQL:', err));

// Define route to save text
app.post('/api/text', async (req, res) => {
  const { content } = req.body;
  const query = 'INSERT INTO texts(content) VALUES($1) RETURNING *';
  const values = [content];

  try {
    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving text:', err);
    res.status(400).send('Error saving text');
  }
});

// Define route to get all texts
app.get('/api/texts', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM texts');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching texts:', err);
    res.status(400).send('Error fetching texts');
  }
});


// Define route to delete a text by ID
app.delete('/api/text/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM texts WHERE id = $1';
  const values = [id];

  try {
    await client.query(query, values);
    res.status(200).send(`Text with ID ${id} deleted.`);
  } catch (err) {
    console.error('Error deleting text:', err);
    res.status(400).send('Error deleting text');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
