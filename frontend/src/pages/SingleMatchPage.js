import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import teamLogos from "../teamLogos";

function SingleMatchPage() {
  const [matchInfo, setMatchInfo] = useState([]);

  const location = useLocation();
  const { match } = location.state;

  const playerPositions = ["PG", "SG", "SF", "PF", "C"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchId = match.id;
        const response = await axios.get(
          `http://localhost:5000/statistikaUtakmice`,
          {
            params: { id: matchId },
          }
        );
        setMatchInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [match.id]);

  // Filtering players based on the team they belong to
  const homeTeamPlayers = matchInfo.filter(
    (player) => player.team_id === match.domaci.id_momcad
  );
  const awayTeamPlayers = matchInfo.filter(
    (player) => player.team_id === match.gosti.id_momcad
  );

  return (
    <div className="single-match-page">
      <header>
        <h1>Match Info</h1>
      </header>

      <div className="match-info">
        <p className="single-match-date">{match.datum}</p>

        <div className="match-card">
          <div className="single-match-team">
            <p className="teams-name">{match.domaci.ime}</p>
            <img
              src={
                teamLogos[
                  match.domaci.ime.toLowerCase().replace(/\s/g, "") + "Logo"
                ]
              }
              alt={`${match.domaci.ime} logo`}
            />
             <p className="player-header">
              <div className="pos-and-name-header">
                <span>Pos</span> <span>Name</span>
              </div >
              <span>PTS</span>
              <span>ASS</span> <span>REB</span> <span>BLK</span>
              <span>STL</span> <span>TO</span>
            </p>
            <ul className="player-list">
              {homeTeamPlayers.map((player, index) => (
                <li key={index}>
                  <div className="pos-and-name">
                    <p className="pos">{playerPositions[player.position - 1]}</p>
                    <p>
                      {player.name} {player.surname}
                    </p>
                  </div>
                  <p>{player.points}</p>
                  <p>{player.assists}</p>
                  <p>{player.rebounds}</p>
                  <p>{player.blocks}</p>
                  <p>{player.steals}</p>
                  <p>{player.turnovers}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="single-match-result">
            <p>
              {match.domaci.brojkoseva}-{match.gosti.brojkoseva}
            </p>
          </div>
          <div className="single-match-team">
            <p className="teams-name">{match.gosti.ime}</p>
            <img
              src={
                teamLogos[
                  match.gosti.ime.toLowerCase().replace(/\s/g, "") + "Logo"
                ]
              }
              alt={`${match.gosti.ime} logo`}
            />
            <p className="player-header">
              <div className="pos-and-name-header">
                <span>Pos</span> <span>Name</span>
              </div >
              <span>PTS</span>
              <span>ASS</span> <span>REB</span> <span>BLK</span>
              <span>STL</span> <span>TO</span>
            </p>
            <ul className="player-list">
              {awayTeamPlayers.map((player, index) => (
                <li key={index}>
                  <div className="pos-and-name">
                    <p className="pos">{playerPositions[player.position - 1]}</p>
                    <p>
                      {player.name} {player.surname}
                    </p>
                  </div>
                  <p>{player.points}</p>
                  <p>{player.assists}</p>
                  <p>{player.rebounds}</p>
                  <p>{player.blocks}</p>
                  <p>{player.steals}</p>
                  <p>{player.turnovers}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMatchPage;
