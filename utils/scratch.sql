

INSERT INTO tblHours (attribute1, attribute2) SELECT jsonb_to_record(data)->>'attribute1' AS attribute1, (jsonb_to_record(data)->>'attribute2')::INTEGER AS attribute2 FROM temp_data;

INSERT INTO employees (name, age, department)
SELECT 
    (data->>'name')::TEXT,
    (data->>'age')::INTEGER,
    (data->>'department')::TEXT
FROM temp_json;

---
INSERT INTO "tblHours" ("txtHoursID", "intDayOfWeek", "txtOpen", "txtClose","txtVenueID") SELECT (data->>'Id')::TEXT, (data->>'DayOfWeek')::INTEGER, (data->>'Open')::TEXT, (data->>'Close')::TEXT, (data->>'intVenueID')::TEXT FROM temp_json;
INSERT INTO "tblSpecialDays" ("txtSpecialDayID", "intDayOfWeek", "txtSpecialID", "txtSpecialStart1","txtSpecialEnd1") SELECT (data->>'Id')::TEXT, (data->>'DayOfWeek')::INTEGER, (data->>'SpecialId')::TEXT, (data->>'StartTime')::TEXT, (data->>'EndTime')::TEXT FROM temp_json;
INSERT INTO "tblSpecialDetails" ("txtSpecialDetailsID", "txtSpecialDetailName", "intDealValue", "txtDealModifier","txtDealNote", "txtDealType", "txtSpecialID") SELECT (data->>'Id')::TEXT, (data->>'Name')::TEXT, (data->>'DealValue')::numeric, (data->>'DealModifier')::TEXT, (data->>'DealNote')::TEXT, (data->>'DealType')::TEXT, (data->>'SpecialId')::TEXT FROM temp_json;


INSERT INTO "tblVenue" ("txtVenueID", "txtVenueName", "txtVenueAddress1", "txtVenuePhoneNumber", "txtVenueWebsite") 
SELECT (data->>'Id')::TEXT, (data->>'Name')::TEXT, (data->>'Address')::TEXT, (data->>'Phone')::TEXT, (data->>'Website')::TEXT FROM temp_json;



INSERT INTO "tblSpecials" ("txtSpecialID", "txtSpecialName", "txtSpecialNote", "txtSpecialLastConfirmed", "txtVenueID") 
SELECT (data->>'Id')::TEXT, (data->>'Name')::TEXT, (data->>'Note')::TEXT, (data->>'datetimeSpecialLastConfirmed')::TEXT, (data->>'VenueID')::TEXT FROM temp_json;


Explanation:

jsonb_to_record function allows you to extract fields from a JSONB object into separate columns. 
->> is used to extract text from JSONB, and we cast attribute2 to INTEGER if it's supposed to be a number.


