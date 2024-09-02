const express = require("express");
const cors = require("cors");
const app = express();

const omjerPobjeda22_23 = require("../frontend/src/queries/omjerPobjeda/22_23.jsx");
const omjerPobjeda23_24 = require("../frontend/src/queries/omjerPobjeda/23_24.jsx");
const omjerPobjeda24_25 = require("../frontend/src/queries/omjerPobjeda/24_25.jsx");

const statistikaIgraca22_23 = require("../frontend/src/queries/statistikaIgraca/22_23.jsx");
const statistikaIgraca23_24 = require("../frontend/src/queries/statistikaIgraca/23_24.jsx");
const statistikaIgraca24_25 = require("../frontend/src/queries/statistikaIgraca/24_25.jsx");
const statistikaIgracaAll = require("../frontend/src/queries/statistikaIgraca/All.jsx");

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "rootuser",
  database: "NBA_league_NEW",
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

app.get("/zadnjaUtakmica", (req, res) => {
  client.query(
    `SELECT *
FROM (
    SELECT *
    FROM Utakmica
    ORDER BY Datum DESC
    LIMIT 1
) AS subquery
ORDER BY Datum
LIMIT 1;`,
    (err, results) => {
      if (err) {
        console.error("Error executing query", err.stack);
        res.json("Something is wrong with the database");
      } else {
        console.log("Query results are :", results.rows);
        res.json(results.rows);
      }
    }
  );
});

app.get("/utakmice", (req, res) => {
  client.query("SELECT * FROM UtakmicaMomcad", (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/statistikaIgraca22/23", (req, res) => {
  client.query(statistikaIgraca22_23, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/statistikaIgraca23/24", (req, res) => {
  client.query(statistikaIgraca23_24, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/statistikaIgraca24/25", (req, res) => {
  client.query(statistikaIgraca24_25, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/statistikaIgracaAll", (req, res) => {
  client.query(statistikaIgracaAll, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/dvorane", (req, res) => {
  client.query("SELECT * FROM stadion", (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/trener", (req, res) => {
  client.query("SELECT * FROM trener", (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/igrac/:id", (req, res) => {
  const id = req.params.id;
  client.query(
    `SELECT * FROM igrac WHERE id_momcad = ${id}`,
    (err, results) => {
      if (err) {
        console.error("Error executing query", err.stack);
        res.json("Something is wrong with the database");
      } else {
        console.log("Query results are :", results.rows);
        res.json(results.rows);
      }
    }
  );
});

app.get("/utakmiceInfo", (req, res) => {
  client.query(`SELECT * FROM utakmica`, (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/statistikaUtakmice", (req, res) => {
  client.query(
    `SELECT 
    UIS.id_Utakmica,
    I.Ime AS name,
    I.Prezime AS surname,
    I.Pozicija AS position,
    I.id_Momcad AS team_id,
    UIS.Points,
    UIS.Rebounds,
    UIS.Assists,
    UIS.Steals,
    UIS.Blocks,
    UIS.Turnovers,
    UIS.Fouls
FROM 
    UtakmicaIgracStatistika UIS
JOIN 
    Igrac I ON UIS.id_Igrac = I.id
WHERE 
    UIS.id_Utakmica = ${req.query.id};`,
    (err, results) => {
      if (err) {
        console.error("Error executing query", err.stack);
        res.json("Something is wrong with the database");
      } else {
        console.log("Query results are :", results.rows);
        res.json(results.rows);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
