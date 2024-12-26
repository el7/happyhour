const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;

// Enable CORS for all origins (not recommended for production)
// app.use(cors());

// Or enable CORS for a specific origin
app.use(cors({
  origin: function (origin, callback) {
    // For development, allow all origins. In production, you'd whitelist or check against a list.
    if (!origin) return callback(null, true);
    if (origin.includes('localhost:')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.options('*', cors()); // enable pre-flight requests for all routes

// get data on a specific special
app.get('/api/specials/:specialId', async (req, res) => {

  const mySpecialId = req.params.specialId;  
  const query = `SELECT * FROM "tblSpecials" WHERE "txtSpecialID" = $1`;
  const values = [mySpecialId];
  console.log('q: ', query, "parameter: ", req.params.specialId);
  
  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

// get data on a specific special's details
app.get('/api/details/:newSpecialId', async (req, res) => {

  console.log('pre-q');

  const mySpecialId = req.params.newSpecialId;
  const query = `SELECT * FROM "tblSpecialDetails" WHERE "txtSpecialID" = $1`;
  const values = [mySpecialId];
  console.log('q: ', query, "id: ", req.params.newSpecialId);
  
  try {
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getSpecialsNow', async (req, res) => {

  const query = `SELECT DISTINCT v."txtVenueID", v."txtVenueName", s."txtSpecialID", s."txtSpecialName", s."txtSpecialNote", h."txtSpecialStart1", h."txtSpecialEnd1" FROM "tblVenue" v JOIN "tblSpecials" s ON v."txtVenueID" = s."txtVenueID" JOIN "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID" WHERE h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE) AND (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME     <= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' AND (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME     >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles';`;
  console.log("q: ", query);

  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});


app.get('/api/getSpecialsHour', async (req, res) => {

  const query = `SELECT DISTINCT v."txtVenueID", v."txtVenueName", s."txtSpecialID", s."txtSpecialName", s."txtSpecialNote", h."txtSpecialStart1", h."txtSpecialEnd1" FROM "tblVenue" v JOIN "tblSpecials" s ON v."txtVenueID" = s."txtVenueID" JOIN "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID" WHERE h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE) AND (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME     <= (CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' + INTERVAL '1 hour')::TIME AND (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME     >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles';`;
  console.log("q: ", query);

  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getSpecialsToday', async (req, res) => {

  const query = `SELECT DISTINCT v."txtVenueID", v."txtVenueName", s."txtSpecialID", s."txtSpecialName", s."txtSpecialNote", h."txtSpecialStart1", h."txtSpecialEnd1" FROM "tblVenue" v JOIN "tblSpecials" s ON v."txtVenueID" = s."txtVenueID" JOIN "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID" WHERE h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE) AND (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')     <= (CURRENT_DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' + TIME '02:30:00'::TIME AND (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME     >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' ORDER BY h."txtSpecialStart1" ASC;`;
  console.log("q: ", query);

  try { 
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
