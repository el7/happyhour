const express = require('express');
const app = express();
const db = require('./db');

app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM your_table');
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
