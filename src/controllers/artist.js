const db = require("../db/index.js");

exports.createArtist = async (req, res) => {
  const { name, genre } = req.body;

  try {
    const {
      rows: [artist],
    } = await db.query(
      `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`,
      [name, genre]
    );
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.read = async (_, res) => {
  const query = "SELECT * FROM Artists";
  const result = await db.query(query);
  res.status(200).json(result.rows);
  console.log(res.status);
};

exports.getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`reqID : ${id}`);
    const query = `SELECT * FROM Artists WHERE id = ${id}`;
    const result = await db.query(query);
    const {
      rows: [row],
    } = result;

    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json(`artist ${id} does not exist`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateArtistById = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;
  let query, params;

  // This is where we check req properties.

  if (name && genre) {
    query = `UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`;
    params = [name, genre, id];
  } else if (name) {
    query = `UPDATE Artist SET name = $1 WHERE id = $2 RETURNING *`;
    params = [name, id];
  } else if (genre) {
    query = `UPDATE Artist SET genre = $1, WHERE id = $2 RETURNING *`;
    params = [genre, id];
  }

  // This is where we do error handling
  try {
    const {
      rows: [artist],
    } = await db.query(query, params);
    if (!artist) {
      res.status(404).json({ message: `artist ${id} does not exist` });
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
