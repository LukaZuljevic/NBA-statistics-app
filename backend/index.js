const express = require("express");
const cors = require("cors");
const app = express();

const omjerPobjeda22_23 = require("../frontend/src/queries/omjerPobjeda/22_23.jsx");
const omjerPobjeda23_24 = require("../frontend/src/queries/omjerPobjeda/23_24.jsx");
const omjerPobjeda24_25 = require("../frontend/src/queries/omjerPobjeda/24_25.jsx");

const brojPoena22_23 = require("../frontend/src/queries/brojPoena/22_23.jsx");
const brojPoena23_24 = require("../frontend/src/queries/brojPoena/23_24.jsx");
const brojPoena24_25 = require("../frontend/src/queries/brojPoena/24_25.jsx");

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "rootuser",
  database: "NBA_league",
});

client.connect().then(() => console.log("Connected to database"));

app.use(cors());

app.get("/momcad", (req, res) => {
  client.query("SELECT * FROM momcad", (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/omjerPobjeda22/23", (req, res) => {
  client.query(omjerPobjeda22_23, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/omjerPobjeda23/24", (req, res) => {
  client.query(omjerPobjeda23_24, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/omjerPobjeda24/25", (req, res) => {
  client.query(omjerPobjeda24_25, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/brojPoena22/23", (req, res) => {
  client.query(brojPoena22_23, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/brojPoena23/24", (req, res) => {
  client.query(brojPoena23_24, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/brojPoena24/25", (req, res) => {
  client.query(brojPoena24_25, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
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
