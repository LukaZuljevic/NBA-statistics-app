import React, { useState, useEffect } from "react";
import axios from "axios";

function AllPlayersStatisticsPage() {
  const [displayCount, setDisplayCount] = useState(30);
  const [sortStat, setSortStat] = useState("");
  const [filterTeam, setFilterTeam] = useState("");
  const [season, setSeason] = useState("All");
  const [playersStatistics, setPlayersStatistics] = useState([]);

  // fetching players statistics data based on a selected season
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/statistikaIgraca${season}`)
        .then((response) => {
          const data = response.data;
          setPlayersStatistics(data);
        }).catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    };

    fetchData();
  }, [season]);

  const handleExpandButton = () => {
    setDisplayCount((prevCount) => prevCount + 30);
  };

  // sorting by selected stat
  const sortedPlayers = [...playersStatistics].sort((a, b) => {
    if (sortStat === "PTS") return b.totalpoints - a.totalpoints;
    if (sortStat === "ASS") return b.totalassists - a.totalassists;
    if (sortStat === "REB") return b.totalrebounds - a.totalrebounds;
    if (sortStat === "BLK") return b.totalblocks - a.totalblocks;
    if (sortStat === "STL") return b.totalsteals - a.totalsteals;
    if (sortStat === "TO") return a.totalturnovers - b.totalturnovers;
    return 0;
  });

  // filtering by team name
  const filteredPlayers = filterTeam
    ? sortedPlayers.filter((player) => player.team_name === filterTeam)
    : sortedPlayers;

  return (
    <div>
      <header>
        <h1>Players Statistics</h1>
      </header>

      <div className="filter-sort-controls">
        <label>
          <span className="sort-label">Season:</span>
          <select
            className="season-sort"
            onChange={(e) => setSeason(e.target.value)}
          >
            <option>All</option>
            <option>22/23</option>
            <option>23/24</option>
            <option>24/25</option>
          </select>
        </label>
        <label>
          <span className="sort-label">Sort by:</span>
          <select
            className="sort-select"
            onChange={(e) => setSortStat(e.target.value)}
            value={sortStat}
          >
            <option value="">Select Stat</option>
            <option value="PTS">Points (PTS)</option>
            <option value="ASS">Assists (ASS)</option>
            <option value="REB">Rebounds (REB)</option>
            <option value="BLK">Blocks (BLK)</option>
            <option value="STL">Steals (STL)</option>
            <option value="TO">Turnovers (TO)</option>
          </select>
        </label>
        <label>
          <span className="sort-label">Filter by Team:</span>
          <select
            className="filter-select"
            onChange={(e) => setFilterTeam(e.target.value)}
            value={filterTeam}
          >
            <option value="">All Teams</option>
            {[
              //new Set ce izbaciti sve duplikate i ostavit ce te samo sa 30 razlicitih imena timova!
              ...new Set(playersStatistics.map((player) => player.team_name)),
            ].map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="all-players-stats">
        <ul>
          {filteredPlayers.slice(0, displayCount).map((player, index) => (
            <li key={index}>
              <div className="single-player-name-section">
                <p className="player-rank">{index + 1}</p>
                <div className="player-info-section">
                  <div className="player">
                    <div className="single-player-name">
                      <h4>{player.player_name}</h4>
                      <h4>{player.player_surname}</h4>
                    </div>
                    <div className="stat-section">
                      <div className="stat-labels">
                        <p>PTS</p>
                        <p>ASS</p>
                        <p>REB</p>
                        <p>BLK</p>
                        <p>STL</p>
                        <p>TO</p>
                      </div>
                      <div className="stat-values">
                        <p>{player.totalpoints}</p>
                        <p>{player.totalassists}</p>
                        <p>{player.totalrebounds}</p>
                        <p>{player.totalblocks}</p>
                        <p>{player.totalsteals}</p>
                        <p>{player.totalturnovers}</p>
                      </div>
                    </div>
                  </div>
                  <p className="team-name">
                    <span>Team:</span> {player.team_name}
                  </p>
                  <hr className="hr"></hr>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn" onClick={handleExpandButton}>
          View More <span>&#8595;</span>
        </button>
      </div>
    </div>
  );
}

export default AllPlayersStatisticsPage;
