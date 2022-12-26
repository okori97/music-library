const { migrate } = require("postgres-migrations");
const loadEnv = require("./loadEnv");

loadEnv();

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

const config = {
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: parseInt(PGPORT),
  ensureDatabaseExists: true,
  defaultDatabase: PGDATABASE,
};

const migrateDB = async (config) => {
  console.log("Migrating Database");

  const output = await migrate(config, "./migrations");

  if (!output.length) {
    console.log("Database is already up to date");
  } else {
    console.log(output);
  }
};

try {
  migrateDB(config);
} catch (err) {
  console.log(err);
}
