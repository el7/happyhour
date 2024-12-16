

/* sample time conversion for txt-fields with ISO 8601 formatted strings */

SELECT *
FROM "tblSpecialHours" 
WHERE CURRENT_TIME BETWEEN 
    (("txtSpecialStart1"::TIMESTAMP)::TIME) 
    AND 
    (("txtSpecialEnd1"::TIMESTAMP)::TIME);