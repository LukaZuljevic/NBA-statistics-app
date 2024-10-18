require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register and hashing password
const saltRounds = 10;

app.post("/register", (req, res) => {
  const checkEmailSql = "SELECT * FROM users WHERE email = $1";

  client.query(checkEmailSql, [req.body.email], (err, results) => {
    if (err) {
      return res.json("Something is wrong with the database");
    }

    // Checking if email already exists
    if (results.rows.length > 0) {
      return res.json("Email already exists");
    }

    // Checking if passwords match
    if (req.body.password !== req.body.password2) {
      return res.json("Passwords do not match");
    }

    // If email does not exist, proceeding with registration
    const sql =
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";

    bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
      if (err) {
        return res.json("Error hashing password");
      }

      const values = [req.body.username, hash, req.body.email];
      client.query(sql, values, (err, results) => {
        if (err) {
          return res.json("Something is wrong with the database");
        }

        res.json("Successfully registered");
      });
    });
  });
});

//Login and comparing passwords
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = $1";

  client.query(sql, [req.body.email], (err, results) => {
    if (err) {
      return res.json("Something is wrong with the database");
    }

    // Checking if user exists
    if (results.rows.length === 0) {
      return res.json("User not found");
    }

    // Comparing passwords and creating access token if passwords match
    bcrypt.compare(
      req.body.password.toString(),
      results.rows[0].password,
      (err, result) => {
        if (err) {
          return res.json("Error comparing passwords");
        }

        if (result) {
          const accessToken = jwt.sign(
            { email: results.rows[0].email },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ accessToken: accessToken });
        } else {
          return res.json("Incorrect password");
        }
      }
    );
  });
});

const omjerPobjeda22_23 = require("../frontend/src/queries/omjerPobjeda/22_23.jsx");
const omjerPobjeda23_24 = require("../frontend/src/queries/omjerPobjeda/23_24.jsx");
const omjerPobjeda24_25 = require("../frontend/src/queries/omjerPobjeda/24_25.jsx");

const statistikaIgraca22_23 = require("../frontend/src/queries/statistikaIgraca/22_23.jsx");
const statistikaIgraca23_24 = require("../frontend/src/queries/statistikaIgraca/23_24.jsx");
const statistikaIgraca24_25 = require("../frontend/src/queries/statistikaIgraca/24_25.jsx");
const statistikaIgracaAll = require("../frontend/src/queries/statistikaIgraca/All.jsx");

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
