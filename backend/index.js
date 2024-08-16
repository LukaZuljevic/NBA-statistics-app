const express = require("express");
const cors = require("cors");
const app = express();

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "rootuser",
  database: "NBA_liga",
});

client.connect().then(() => console.log("Connected to database"));

app.use(cors());

app.get("/momcad", (req, res) => {
  client.query("SELECT * FROM momcad", (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      //TODO check what returns in case of error
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
