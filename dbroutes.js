const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;

// Enable CORS for all origins (not recommended for production)
// app.use(cors());

// Or enable CORS for a specific origin
app.use(cors({
  origin: 'http://localhost:8080'
}));

app.get('/api/venues/:id', async (req, res) => {

  const venueId = req.params.id;
  const query = `SELECT * FROM "tblVenue" WHERE "txtVenueID" = $1`;
  const values = [venueId];
 
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues', async (req, res) => {

  const query = `SELECT * FROM "tblVenue"`;
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error('Error in /api/venues:', err.stack); // Make sure you see this in your logs
    res.status(500).json({ error: 'Failed to fetch venues', message: err.message });
  }
});

app.get('/api/venues/:id/specials', async (req, res) => {

  const venueId = req.params.id;
  const query = `SELECT * FROM "tblSpecials" WHERE "txtVenueID" = $1`;
  const values = [venueId];
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues/:id/specials/:myspecialid', async (req, res) => {

//SELECT * FROM "tblSpecials" WHERE "txtVenueID" = "0VE0000001" AND "txtSpecialID" = "0SP0000001";


  const venueId = req.params.id;
  const specialId = req.params.myspecialid;  
  const query = `SELECT * FROM "tblSpecials" WHERE "txtVenueID" = $1 AND "txtSpecialID" = $2`;
  const values = [venueId, specialId];
  console.log('q: ', query);
  
  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues/:id/specials/:myspecialid/details', async (req, res) => {

  const venueId = req.params.id;
  const specialId = req.params.myspecialid;
  const query = `SELECT * FROM "tblSpecialDetails" WHERE "txtSpecialID" = $1`;
  const values = [specialId];
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues/:id/specials/:id/hours', async (req, res) => {

  const venueId = req.params.id;
  const specialId = req.params.id;
  const query = `SELECT * FROM "tblSpecialHours" WHERE "txtSpecialID" = $1`;
  const values = [specialId];
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/specials', async (req, res) => {

  const query = `SELECT * FROM "tblSpecials"`;
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/specialHours', async (req, res) => {

  const query = `SELECT * FROM "tblSpecialHours"`;
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues/:id/specials/:myspecialid/hours/:myhoursid', async (req, res) => {

// SELECT * FROM "tblSpecialHours" WHERE "txtSpecialID" = '0SP0000001' AND "txtSpecialHourID" = '0TI0000001'

  const venueId = req.params.id;
  const specialId = req.params.myspecialid;
  const hourId = req.params.myhoursid;
  const query = `SELECT * FROM "tblSpecialHours" WHERE "txtSpecialID" = $1 AND "txtSpecialHourID" = $2`;
  const values = [specialId, hourId];
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues/:id/attributes', async (req, res) => {

  const venueId = req.params.id;
  const query = `SELECT * FROM "tblVenueAttributes"`;
  const values = [venueId];
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues/:id/attributes/:id', async (req, res) => {

  const venueId = req.params.id;
  const attributeId = req.params.id;
  const query = `SELECT * FROM "tblVenueAttributes" WHERE "txtVenueID" = $1 AND "txtAttributeID" = $2`;
  const values = [venueId, attributeId];
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues/:id/hours', async (req, res) => {

  const venueId = req.params.id;
  const query = `SELECT * FROM "tblVenueHours" WHERE "txtVenueID" = $1`;
  const values = [venueId];
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/venues/:id/hours/:myhoursid', async (req, res) => {

// SELECT * FROM "tblVenueHours" WHERE "txtVenueID" = '0VE0000001' AND "txtHoursID" = '0HO0000001'

  const venueId = req.params.id;
  const venueHourId = req.params.myhoursid;
  const query = `SELECT * FROM "tblVenueHours" WHERE "txtVenueID" = $1 AND "txtHoursID" = $2`;
  const values = [venueId, venueHourId];
  console.log('q: ', query);

  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});




app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM "tblVenue"');
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/auth/login', async (req, res) => {
  try {
    const { rows } = db.query('SELECT * FROM "tblVenue"');
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/auth/logout', async (req, res) => {
  try {
    const { rows } = db.query('SELECT * FROM "tblVenue"');
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { rows } = db.query('SELECT * FROM "tblVenue"');
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { rows } = db.query('SELECT * FROM "tblVenue"');
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});


app.get('/api/getSpecialsNow', async (req, res) => {
  try {
    const { rows } = db.query(`SELECT DISTINCT v."txtVenueID", v."txtVenueName", s."txtSpecialID", s."txtSpecialName", s."txtSpecialNote", h."txtSpecialStart1", h."txtSpecialEnd1" FROM "tblVenue" v JOIN "tblSpecials" s ON v."txtVenueID" = s."txtVenueID" JOIN "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID" WHERE h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE) AND (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles') <= (CURRENT_TIME + INTERVAL '0 hour')::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' + TIME '02:30:00' AND (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles';`);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

/*
app.get('/api/getSpecialsHour', async (req, res) => {
  try {
    const { rows } = db.query(`SELECT DISTINCT v."txtVenueID", v."txtVenueName", s."txtSpecialID", s."txtSpecialName", s."txtSpecialNote", h."txtSpecialStart1", h."txtSpecialEnd1" FROM "tblVenue" v JOIN "tblSpecials" s ON v."txtVenueID" = s."txtVenueID" JOIN "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID" WHERE h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE) AND (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles') <= (CURRENT_TIME + INTERVAL '1 hour')::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' + TIME '02:30:00' AND (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles';`);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getSpecialsToday', async (req, res) => {
  let offset = `'02:30:00'`;
  try { 
    const { rows } = db.query(`SELECT DISTINCT v."txtVenueID",v."txtVenueName",s."txtSpecialID",s."txtSpecialName",s."txtSpecialNote",    h."txtSpecialStart1",h."txtSpecialEnd1"FROM "tblVenue" vJOIN "tblSpecials" s ON v."txtVenueID" = s."txtVenueID"JOIN "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID"WHERE h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE) AND (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles') <= (CURRENT_DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' + TIME ${offset} AND (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles';`);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});
*/

app.listen(port, () => console.log(`Server is running on port ${port}`));
