const brojPoenaUSezoni = `WITH SeasonDates AS (
    SELECT
        pocetak AS season_start,
        kraj AS season_end
    FROM
        sezona
    WHERE
        naziv = '23/24' 
),

-- Aggregate points by team for the specified season
TeamPoints AS (
    SELECT
        m.ime AS team,
        SUM(uis.points) AS total_points
    FROM
        utakmicamomcad um
    JOIN
        momcad m ON um.id_momcad = m.id
    JOIN
        utakmica u ON um.id_utakmica = u.id
    JOIN
        utakmicaigracstatistika uis ON uis.id_utakmica = u.id
    JOIN
        SeasonDates sd ON u.datum BETWEEN sd.season_start AND sd.season_end
    GROUP BY
        m.ime
)

SELECT
    team,
    total_points
FROM
    TeamPoints
ORDER BY
    total_points DESC;`;

module.exports = brojPoenaUSezoni;
