import express from "express";
import pg from "pg";
import "dotenv/config";
import fs from "fs";

//Using EJS with ESM (ECMAscript Modules)
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const { Pool } = pg;
const expressPort = process.env.PORT;
let userID;

const pool = new Pool({
  user: "xxjrtxx",
  host: "localhost",
  password: "Passw0rd4U",
  database: "themed_list_db",
  port: 5432,
});
// const connectionString = process.env.DATABASE_URL;

// const pool = new Pool({
//   connectionString,
// });

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.set("views", path.join(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/public/views"));

app.get("/lists/grocery", (req, res) => {
  res.render("grocery.ejs");
});
// -------------------------------------------------------------------_GET ROUTE TO SEE ALL THEMES------------------------------------------
app.get("/lists/themes", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from themes");
    res.status(200).send(rows);
  } catch (error) {
    res.status(404).send("No data found");
  }
});
// --------------------------------------------------------------GET ROUTE TO VIEW USER-------------------------------------------
app.get("/lists/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from users");
    let lastRow = rows.length - 1;
    userID = rows[lastRow].user_id;
    res.status(200).send(rows);
  } catch (error) {
    res.status(404).send("No data found");
  }
});
// ------------------------------------------------------POST ROUTE TO ADD USER-----------------------------------------------
app.post("/lists/users", async (req, res) => {
  const { firstname } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (firstname) VALUES ($1)`,
      [firstname]
    );
    const newUserQuery = await pool.query(
      `SELECT * FROM users ORDER BY user_id DESC LIMIT 1`
    );
    const newUser = newUserQuery.rows[0];
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ----------------------------------------------------GET ROUTE TO VIEW ALL TASK/COMPLETE-BY--------------------------------------------
app.get("/lists/todo", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from todo_list");
    res.status(200).send(rows);
  } catch (error) {
    res.status(404).send("No data found");
  }
});
// ------------------------------------------------------POST ROUTE TO ADD TASK/COMPLETE-BY-------------------------------------------
app.post("/lists/todo", async (req, res) => {
  const { task, complete_by } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO todo_list (task, complete_by, user_id) VALUES ($1, $2, $3)`,
      [task, complete_by, userID]
    );
    const todoTaskQuery = await pool.query(
      `SELECT * FROM todo_list ORDER BY user_id DESC LIMIT 1`
    );
    const newTask = todoTaskQuery.rows[0];
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ----------------------------------------------------------................................PATCH METHODS.............................................................

app.patch("/lists/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { task, complete_by, user_id } = req.body;

  try {
    await pool.query(
      `UPDATE todo_list SET task = $1, complete_by = $2, user_id  = $3 WHERE id = $4`,
      [task, complete_by, user_id, id]
    );
    const { rows } = await pool.query(`SELECT * FROM todo_list WHERE id = $1`, [
      id,
    ]);

    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Outside range of table");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
//////////////////////////////////////////////////////////////DELETE METHOD TO DELETE TASK/COMPLETE-BY///////////////////////////////////////////////////////
app.delete("/lists/todo/:id", async (req, res) => {
  const { id } = req.params;

  const parsedId = parseInt(id, 10);

  if (!Number.isInteger(parsedId)) {
    return res
      .status(404)
      .send("Not Found. Invalid index. Please provide an integer.");
  }
  try {
    let rowQuery = await pool.query("SELECT COUNT(*) FROM todo_list");
    let totalRowsArray = rowQuery.rows;
    let totalRowsNumber = totalRowsArray[0].count;

    if (parsedId >= 0) {
      const { rows } = await pool.query(
        `DELETE from todo_list WHERE id = ${id}`
      );
      res.status(200).send(`Deleted data from ROW: ${id}`);
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

// https://fullstack-themed-lists-application.onrender.com
