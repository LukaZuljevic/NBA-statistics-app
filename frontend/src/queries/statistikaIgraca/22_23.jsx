const statistikaIgracaQuery = `WITH PlayerSeasonStats AS (
    SELECT
        i.id AS player_id,
        i.Ime AS player_name,
        i.Prezime AS player_surname,
        m.Ime AS team_name,
        s.Naziv AS season_name,

        SUM(uis.Points) AS totalpoints,
        SUM(uis.Rebounds) AS totalrebounds,
        SUM(uis.Assists) AS totalassists,
        SUM(uis.Steals) AS totalsteals,
        SUM(uis.Blocks) AS totalblocks,
        SUM(uis.Turnovers) AS totalturnovers,
        SUM(uis.Fouls) AS totalfouls

    FROM Igrac i
    JOIN UtakmicaIgracStatistika uis ON i.id = uis.id_Igrac
    JOIN Utakmica u ON uis.id_Utakmica = u.id
    JOIN Momcad m ON i.id_Momcad = m.id
    JOIN Sezona s ON u.Datum BETWEEN s.Pocetak AND s.Kraj

	WHERE s.naziv = '22/23'
    GROUP BY i.id, i.Ime, i.Prezime, m.Ime, s.Naziv
)

SELECT
    player_id,
    player_name,
    player_surname,
    team_name,
    season_name,
    totalpoints,
    totalrebounds,
    totalassists,
    totalsteals,
    totalblocks,
    totalturnovers,
    totalfouls

FROM PlayerSeasonStats
ORDER BY player_id, season_name;`;

module.exports = statistikaIgracaQuery;
