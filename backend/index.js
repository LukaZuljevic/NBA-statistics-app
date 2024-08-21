const express = require("express");
const cors = require("cors");
const app = express();

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
      //TODO check what returns in case of error
      res.json("Something is wrong with the database");
    } else {
      console.log("Query results are :", results.rows);
      res.json(results.rows);
    }
  });
});

app.get("/omjerPobjeda", (req, res) => {
  client.query(`WITH MatchResults AS (
    SELECT
        um.id_Utakmica AS match_id,
        m.Ime AS team,
        CASE
            WHEN COALESCE(SUM(uis.Points), 0) > COALESCE(a.awayTeam_Points, 0) THEN 'win'
            WHEN COALESCE(SUM(uis.Points), 0) < COALESCE(a.awayTeam_Points, 0) THEN 'loss'
            ELSE 'draw'
        END AS result
    FROM
        UtakmicaMomcad um
    LEFT JOIN
        Momcad m ON um.id_Momcad = m.id
    LEFT JOIN
        Igrac i ON i.id_Momcad = m.id
    LEFT JOIN
        UtakmicaIgracStatistika uis ON uis.id_Igrac = i.id AND uis.id_Utakmica = um.id_Utakmica
    LEFT JOIN (
        SELECT
            um.id_Utakmica AS match_id,
            COALESCE(SUM(uis.Points), 0) AS awayTeam_Points
        FROM
            UtakmicaMomcad um
        LEFT JOIN
            Igrac i ON i.id_Momcad = um.id_Momcad
        LEFT JOIN
            UtakmicaIgracStatistika uis ON uis.id_Igrac = i.id AND uis.id_Utakmica = um.id_Utakmica
        WHERE
            um.domaciGosti = 'gosti'
        GROUP BY
            um.id_Utakmica
    ) a ON um.id_Utakmica = a.match_id
    WHERE
        um.domaciGosti = 'domaci'
    GROUP BY
        um.id_Utakmica, m.Ime, a.awayTeam_Points

    UNION ALL

    SELECT
        um.id_Utakmica AS match_id,
        m.Ime AS team,
        CASE
            WHEN COALESCE(SUM(uis.Points), 0) > COALESCE(h.homeTeam_Points, 0) THEN 'win'
            WHEN COALESCE(SUM(uis.Points), 0) < COALESCE(h.homeTeam_Points, 0) THEN 'loss'
            ELSE 'draw'
        END AS result
    FROM
        UtakmicaMomcad um
    LEFT JOIN
        Momcad m ON um.id_Momcad = m.id
    LEFT JOIN
        Igrac i ON i.id_Momcad = m.id
    LEFT JOIN
        UtakmicaIgracStatistika uis ON uis.id_Igrac = i.id AND uis.id_Utakmica = um.id_Utakmica
    LEFT JOIN (
        SELECT
            um.id_Utakmica AS match_id,
            COALESCE(SUM(uis.Points), 0) AS homeTeam_Points
        FROM
            UtakmicaMomcad um
        LEFT JOIN
            Igrac i ON i.id_Momcad = um.id_Momcad
        LEFT JOIN
            UtakmicaIgracStatistika uis ON uis.id_Igrac = i.id AND uis.id_Utakmica = um.id_Utakmica
        WHERE
            um.domaciGosti = 'domaci'
        GROUP BY
            um.id_Utakmica
    ) h ON um.id_Utakmica = h.match_id
    WHERE
        um.domaciGosti = 'gosti'
    GROUP BY
        um.id_Utakmica, m.Ime, h.homeTeam_Points
)

SELECT
    team,
    SUM(CASE WHEN result = 'win' THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN result = 'loss' THEN 1 ELSE 0 END) AS losses,
    SUM(CASE WHEN result = 'draw' THEN 1 ELSE 0 END) AS draws
FROM
    MatchResults
GROUP BY
    team
ORDER BY
    wins DESC, losses ASC, draws DESC;`, (err, results) => {
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
