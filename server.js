import express from "express";
import pg from "pg";
import "dotenv/config";

// const app = express();
// const { Pool } = pg;
// const pool = new Pool({
//   connectionString, N 

// });
const connectionString = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`listening on Port ${expressPort}`);
});
