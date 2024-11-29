
INSERT INTO "tblVenue" ("txtVenueID", "txtVenueName", "txtVenueAddress1", "txtVenueAddress2", "txtVenueAddress3", "txtVenuePhoneNumber", "txtVenueWebsite", "txtVenueNote")
VALUES 
('0VE9999999', 'The Tipsy Tankard', '123 Main St', 'Suite A', 'Anytown, USA', '+15415551234', 'www.tipsytankard.com', 'Great for groups'),
('0VE9999998', 'Moonlit Lounge', '456 Ocean Ave', 'Beach City, USA', NULL, '+15415555678', 'www.moonlitlounge.com', 'Live music on weekends');

INSERT INTO "tblSpecials" ("txtSpecialID", "txtSpecialName", "txtSpecialNote", "tstzSpecialLastConfirmed", "txtVenueID")
VALUES 
('0SP9999999', 'Happy Hour', 'Daily', '2023-11-29 12:00:00+00', '0VE9999999'),
('0SP9999998', 'Ladies Night', 'Discounts for women', '2023-11-29 12:00:00+00', '0VE9999998');

INSERT INTO "tblSpecialDetails" ("txtSpecialDetailsID", "txtSpecialDetailName", "intDealValue", "txtDealModifier", "txtDealNote", "txtDealType", "txtSpecialID")
VALUES 
('0DE9999999', 'Test Buy One Get One Free', 0, '=', 'Test Applies to all menu items', 'Food', '0SP9999999'),
('0DE9999998', '20% Off', 20, '%', 'Only on appetizers', 'Food', '0SP9999998');

INSERT INTO "tblSpecialHours" ("txtSpecialHourID", "intDayOfWeek", "tstzrSpecialTime1", "tstzrSpecialTime2", "txtSpecialID", "txtSpecialStart1", "txtSpecialEnd1", "txtSpecialStart2", "txtSpecialEnd2")
VALUES 
('0TI9999999', 0, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999998', 1, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999997', 2, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999996', 3, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999995', 4, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999994', 5, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999993', 6, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999992', 0, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z','2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999991', 1, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z','2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999990', 2, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z','2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999989', 3, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z','2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999988', 4, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z','2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999987', 5, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z','2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0TI9999986', 6, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0SP9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z','2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z');


INSERT INTO "tblVenueAttributes" ("txtAttributeID", "txtAttributeName", "txtAttributeNote", "txtVenueID")
VALUES 
('0AT9999999', 'Beer', '20 Taps', '0VE9999999'),
('0AT9999998', 'Liquor', 'All day', '0VE9999999'),
('0AT9999997', 'Beer', '20 Taps', '0VE9999998'),
('0AT9999996', 'Liquor', 'All day', '0VE9999998'),
('0AT9999999', 'Live Music', '20 Taps', '0VE9999998'),
('0AT9999998', 'billiards', 'All day', '0VE9999998');


INSERT INTO "tblVenueHours" ("txtHoursID", "intDayOfWeek", "tstzrOpen", "txtVenueID", "txtOpen", "txtClose")
VALUES 
('0HO9999999', 0, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999998', 1, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999997', 2, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999996', 3, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999995', 4, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999994', 5, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999993', 6, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999999', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999992', 0, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999991', 1, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999990', 2, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999989', 3, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999988', 4, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999987', 5, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z'),
('0HO9999986', 6, tstzrange('2023-01-01T00:00:00.000Z'::timestamptz, '2023-01-01T23:59:59.000Z'::timestamptz, '[]'), '0VE9999998', '2023-01-01T00:00:00.000Z', '2023-01-01T23:59:59.000Z')
;
-- You would need to repeat this for each day of the week as necessary



