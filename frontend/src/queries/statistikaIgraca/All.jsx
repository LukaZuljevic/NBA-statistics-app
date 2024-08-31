const statistikaIgracaQuery = `-- Aggregate statistics for each player across all seasons
SELECT
    i.id AS player_id,
    i.Ime AS player_name,
    i.Prezime AS player_surname,
    m.Ime AS team_name,

    SUM(uis.Points) AS totalpoints,
    SUM(uis.Rebounds) AS totalrebounds,
    SUM(uis.Assists) AS totalassists,
    SUM(uis.Steals) AS totalsteals,
    SUM(uis.Blocks) AS totalblocks,
    SUM(uis.Turnovers) AS totalturnovers,
    SUM(uis.Fouls) AS totalfouls

FROM Igrac i
JOIN UtakmicaIgracStatistika uis ON i.id = uis.id_Igrac
JOIN Momcad m ON i.id_Momcad = m.id

GROUP BY i.id, i.Ime, i.Prezime, m.Ime
ORDER BY i.id;
`;

module.exports = statistikaIgracaQuery;
