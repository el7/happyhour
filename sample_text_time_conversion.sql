

/* sample time conversion for txt-fields with ISO 8601 formatted strings */
/* (today) includes day filter */

SELECT DISTINCT 
    v."txtVenueID",
    v."txtVenueName",
    s."txtSpecialID",
    s."txtSpecialName",
    h."txtSpecialStart1",
    h."txtSpecialEnd1"
FROM 
    "tblVenue" v
JOIN 
    "tblSpecials" s ON v."txtVenueID" = s."txtVenueID"
JOIN 
    "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID"
WHERE 
    h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE)
    AND 
    (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles') 
        <= (CURRENT_DATE + INTERVAL '1 day')::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' + TIME '02:30:00'
    AND 
    (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME 
        >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles';

/* (hour) */

SELECT DISTINCT 
    v."txtVenueID",
    v."txtVenueName",
    s."txtSpecialID",
    s."txtSpecialName",
    h."txtSpecialStart1",
    h."txtSpecialEnd1"
FROM 
    "tblVenue" v
JOIN 
    "tblSpecials" s ON v."txtVenueID" = s."txtVenueID"
JOIN 
    "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID"
WHERE 
    h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE)
    AND 
    (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles') 
        <= (CURRENT_TIME + INTERVAL '1 hour')::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' + TIME '02:30:00'
    AND 
    (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME 
        >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles';


/* (now) */

SELECT DISTINCT 
    v."txtVenueID",
    v."txtVenueName",
    s."txtSpecialID",
    s."txtSpecialName",
    h."txtSpecialStart1",
    h."txtSpecialEnd1"
FROM 
    "tblVenue" v
JOIN 
    "tblSpecials" s ON v."txtVenueID" = s."txtVenueID"
JOIN 
    "tblSpecialHours" h ON s."txtSpecialID" = h."txtSpecialID"
WHERE 
    h."intDayOfWeek" = EXTRACT(DOW FROM CURRENT_DATE)
    AND 
    (h."txtSpecialStart1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles') 
        <= (CURRENT_TIME + INTERVAL '0 hour')::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles' + TIME '02:30:00'
    AND 
    (h."txtSpecialEnd1"::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles')::TIME 
        >= CURRENT_TIME AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles';

