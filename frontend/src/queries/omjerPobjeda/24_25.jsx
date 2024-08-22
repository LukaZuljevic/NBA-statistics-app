const omjerPobjedaQuery = `
WITH SeasonDates AS (
    SELECT
        pocetak AS season_start,
        kraj AS season_end
    FROM
        sezona
    WHERE
        naziv = '24/25' -- Replace with the actual season name or identifier
),

TeamPoints AS (
    SELECT
        um.id_Utakmica AS match_id,
        m.Ime AS team,
        SUM(uis.Points) AS team_points,
        um.domaciGosti
    FROM
        UtakmicaMomcad um
    LEFT JOIN
        Momcad m ON um.id_Momcad = m.id
    LEFT JOIN
        Igrac i ON i.id_Momcad = m.id
    LEFT JOIN
        UtakmicaIgracStatistika uis ON uis.id_Igrac = i.id AND uis.id_Utakmica = um.id_Utakmica
    JOIN
        utakmica u ON um.id_Utakmica = u.id
    JOIN
        SeasonDates sd ON u.datum BETWEEN sd.season_start AND sd.season_end
    GROUP BY
        um.id_Utakmica, m.Ime, um.domaciGosti
),

MatchResults AS (
    SELECT
        tp.match_id,
        tp.team,
        CASE
            WHEN tp.team_points > opp.team_points THEN 'win'
            WHEN tp.team_points < opp.team_points THEN 'loss'
            ELSE 'draw'
        END AS result
    FROM
        TeamPoints tp
    LEFT JOIN
        TeamPoints opp ON tp.match_id = opp.match_id AND tp.domaciGosti != opp.domaciGosti
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
    wins DESC, losses ASC, draws DESC;`;

module.exports = omjerPobjedaQuery;
