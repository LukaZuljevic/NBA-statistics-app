import { useState } from "react";

function PlayersStatistics({ playerStatistics }) {
  const [selectedStat, setSelectedStat] = useState("Points");

  const handleStatChange = (e) => {
    setSelectedStat(e.target.value);
  };

  //mapping the statistics so I can sort them easily
  const statMapping = {
    Points: "totalpoints",
    Rebounds: "totalrebounds",
    Assists: "totalassists",
    Steals: "totalsteals",
    Blocks: "totalblocks",
    Turnovers: "totalturnovers",
    Fouls: "totalfouls",
  };

  // Sorting players based on the selected statistic
  const sortedStatistics = [...playerStatistics].sort((a, b) => {
    const statProperty = statMapping[selectedStat];
    return parseInt(b[statProperty], 10) - parseInt(a[statProperty], 10);
  });

  return (
    <div className="players-stats">
      <div>
        <select className="stat-select" onChange={handleStatChange}>
          <option value="Points">Points</option>
          <option value="Rebounds">Rebounds</option>
          <option value="Assists">Assists</option>
          <option value="Steals">Steals</option>
          <option value="Blocks">Blocks</option>
          <option value="Turnovers">Turnovers</option>
        </select>
      </div>
      <div className="info-bar">
        <p>#</p>
        <p>{selectedStat}</p>
      </div>
      <hr></hr>
      <ul>
        {sortedStatistics.slice(0, 15).map((player, index) => (
          <li key={index}>
            <div className="player-name-section">
              <p className="player-rank">{index + 1}</p>
              <div className="player-info-section">
                <div className="player-name">
                  <h4>{player.firstname}</h4>
                  <h4>{player.lastname}</h4>
                </div>
                <p className="team-name">
                  <span>Team:</span> {player.teamname}
                </p>
              </div>
            </div>
            <p>{player[statMapping[selectedStat]]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayersStatistics;
