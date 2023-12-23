import express from "express";
import pg from "pg";
import "dotenv/config";
import fs from "fs";

const app = express();
const { Pool } = pg;
const expressPort = process.env.PORT;

const pool = new Pool({
  user: "xxjrtxx",
  host: "localhost",
  password: "Passw0rd4U",
  database: "themed_list_db",
  port: 5432,
});
// const connectionString = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/lists/themes", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from themes");
    res.status(200).send(rows);
  } catch (error) {
    res.status(404).send("No data found");
  }
});

app.get("/lists/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from users");
    res.status(200).send(rows);
  } catch (error) {
    res.status(404).send("No data found");
  }
});

app.post("/lists/users", async (req, res) => {
  const { firstname } = req.body;
  const { lastname } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (firstname, lastname) VALUES ($1, $2)`,
      [firstname, lastname]
    );
    console.log(rows);
    const newUserQuery = await pool.query(
      `SELECT * FROM users ORDER BY user_id DESC LIMIT 1`
    );
    const newUser = newUserQuery.rows[0];
    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//////////////////////////////////////////////////////////////DELETE METHOD TO DELETE USERS///////////////////////////////////////////////////////
app.delete("/lists/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname } = req.body;
  const { lastname } = req.body;
  const parsedId = parseInt(id, 10);

  if (!Number.isInteger(parsedId)) {
    return res
      .status(404)
      .send("Not Found. Invalid index. Please provide an integer.");
  }
  try {
    let rowQuery = await pool.query("SELECT COUNT(*) FROM users");
    let totalRowsArray = rowQuery.rows;
    let totalRowsNumber = totalRowsArray[0].count;

    if (parsedId >= 0 && parsedId <= totalRowsNumber) {
      const { rows } = await pool.query(`DELETE from users WHERE user_id = ${id}`);
      res
        .status(200)
        .send(
          `Deleted data from ROW: ${id} containing ${firstname}, ${lastname}`
        );
    } else {
      res.status(404).send("Outside range of table!");
    }
  } catch (error) {
    console.error(error);
    res.send(500).send("Internal Server Error");
  }
});

app.listen(expressPort, () => {
  console.log(`listening on Port ${expressPort}`);
});
