import json
import psycopg2
from psycopg2.extras import execute_values

# Database connection details
DB_NAME = "dbHappyHourData"
DB_USER = "auxillary"
DB_PASS = "HappyHourAuxillary"
DB_HOST = "localhost"  # or your host address
DB_PORT = "5432"  # default PostgreSQL port

# Connect to the database
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS,
    host=DB_HOST,
    port=DB_PORT
)

# Open a cursor to perform database operations
cur = conn.cursor()

# Read JSON file
with open('./happyhours.json', 'r') as f:
    data = json.load(f)

# Assuming 'data' is a list of dictionaries where each dictionary represents a row
for item in data['Restaurants']:
    r_name = item['Name']
    r_add = item['Address']
    r_phone = item['Phone']
    r_website = item['Website']
    r_id = item['Id']
    print("- " + r_name + "(" + r_add + ", " + r_phone + ", " + r_website + ", " + r_id + ")");



# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data import completed.")



