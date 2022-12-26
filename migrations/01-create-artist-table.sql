CREATE TABLE Artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL
);

-- Migrations are best thought of as a series of scripts which are run in a database exactly once. 
-- We run them when we want to set up a new database, or when we add a new feature to an existing database.