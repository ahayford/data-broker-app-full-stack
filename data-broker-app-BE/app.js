const express = require("express");
const cors = require("cors");
const port = 4000;

const app = express();

app.use(cors())


const db = require("./db");

app.use(express.json());

app.get("/brokers", async (req, res) => {
  try {
    const rows = await db.any(`SELECT * FROM databrokers_csv`);
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/brokers/:id", async (req, res) => {
  let brokerId = req.params.id;
  const rows = await db.any(
    `SELECT * FROM databrokers_csv WHERE id = ${brokerId}`
  );
  if (rows.length === 1) {
    // row found
    res.json(rows[0]);
  } else {
    // row not found
    res.send({ message: `Could not find broker with ID ${id}` });
  }
});

app.put(`/brokers/:id/toggle`, async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await db.any(`
        UPDATE databrokers_csv
           SET optoutcomplete = NOT optoutcomplete
         WHERE id = ${id}
        RETURNING *
    `);

    if (rows.length === 1) {
      // row was updated
      res.send(rows);
    } else {
      // row not found
      res.send({ message: `Could not find broker with ID ${id}` });
    }
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
