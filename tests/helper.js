const db = require("../src/db/index.js");

afterEach(async () => {
  await db.query("TRUNCATE Artists CASCADE");
});
