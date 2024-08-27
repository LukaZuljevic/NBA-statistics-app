const statistikaIgracaQuery = `SELECT 
    i.Ime AS firstName,
    i.Prezime AS lastName,
    m.Ime AS TeamName,
    SUM(uis.Points) AS TotalPoints,
    SUM(uis.Rebounds) AS TotalRebounds,
    SUM(uis.Assists) AS TotalAssists,
    SUM(uis.Steals) AS TotalSteals,
    SUM(uis.Blocks) AS TotalBlocks,
    SUM(uis.Turnovers) AS TotalTurnovers,
    SUM(uis.Fouls) AS TotalFouls
FROM 
    UtakmicaIgracStatistika uis
JOIN 
    Igrac i ON uis.id_Igrac = i.id
JOIN 
    Momcad m ON i.id_Momcad = m.id
JOIN 
    Utakmica u ON uis.id_Utakmica = u.id
JOIN 
    UtakmicaMomcad um ON u.id = um.id_Utakmica
JOIN 
    SezonaMomcad sm ON um.id_Momcad = sm.id_Momcad
JOIN 
    Sezona s ON sm.id_Sezona = s.id
GROUP BY 
    i.Ime, i.Prezime, m.Ime
ORDER BY 
    m.Ime, i.Prezime, i.Ime;`;

module.exports = statistikaIgracaQuery;
