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

app.get("/igrac", async (req, res) => {
  try {
    const query = await client.query("SELECT * FROM igrac");
    console.log(query.rows);
    res.json(query.rows); // Send the data back to the client as JSON
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
