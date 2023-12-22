import express from "express";
import pg from "pg";
import "dotenv/config";

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

app.get("/lists", async (req, res) => {
  //SELECT <list_of_column_names> FROM <table1> , <table2> … <tableN> WHERE <conditions>;
  try {
    const { rows } = await pool.query(`SELECT * FROM themes`);
    res.status(200).send(rows);
  } catch (error) {
    res.status(404).send("No data found");
  }
});

app.listen(expressPort, () => {
  console.log(`listening on Port ${expressPort}`);
});
