import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlayersStatistics({ season }) {
  const [selectedStat, setSelectedStat] = useState("Points");
  const [playerStatistics, setPlayerStatistics] = useState([]);

  //fetching player statistics data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/statistikaIgraca${season}`)
        .then((response) => {
          const data = response.data;
          setPlayerStatistics(data);
        }).catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    };

    fetchData();
  }, [season]);

  //handling the change of the selected statistic
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/statistics");
  };

  return (
    <div className="players-stats">
      <h4 className="statistics-title">Player statistics</h4>
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
                  <h4>{player.player_name}</h4>
                  <h4>{player.player_surname}</h4>
                </div>
                <p className="team-name">
                  <span>Team:</span> {player.team_name}
                </p>
              </div>
            </div>
            <p>{player[statMapping[selectedStat]]}</p>
          </li>
        ))}
      </ul>
      <hr></hr>
      <div>
        <button className="btn" onClick={handleClick}>
          View detailed statistics
        </button>
      </div>
    </div>
  );
}

export default PlayersStatistics;
