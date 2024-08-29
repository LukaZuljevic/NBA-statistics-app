import { useLocation } from "react-router-dom";
import teamLogos from "./teamLogos";
import staduimSeats from "./assets/stadiumSeats.png";
import { useEffect, useState } from "react";
import axios from "axios";

function TeamPage() {
  const [players, setPlayers] = useState([]);

  const location = useLocation();
  const { team } = location.state;

  console.log(team);

  //fetch all the players with the same team id as the team id
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/igrac/${team.id}`)
        .then((response) => {
          const data = response.data;
          setPlayers(data);
        });
    };

    fetchData();
  }, []);

  console.log(players);

  return (
    <div className="team-page">
      <header className="team-header">
        <h1>Team section</h1>
      </header>

      <div
        className="info-section"
        style={{
          backgroundImage: `url(${
            teamLogos[team.ime.toLowerCase().replace(/\s/g, "") + "Logo"]
          })`,
        }}
      >
        <div className="left">
          <div
            className="team-info"
            style={{
              backgroundImage: `url(${
                teamLogos[team.ime.toLowerCase().replace(/\s/g, "") + "Logo"]
              })`,
            }}
          >
            <img
              src={
                teamLogos[team.ime.toLowerCase().replace(/\s/g, "") + "Logo"]
              }
              alt={`${team.ime} logo`}
              className="team-logo"
            />
            <div className="team-name">
              <h2>{team.ime}</h2>
            </div>
          </div>

          <div className="left-bottom">
            <div className="coach-section">
              <h2>Coach</h2>
              <div className="coach-info">
                <img
                  src={team.coachPicture}
                  alt={`Coach ${team.coachName}`}
                  className="coach-image"
                />
                <div className="coach-details">
                  <p>
                    <strong>Name:</strong> {team.coach.ime} {team.coach.prezime}
                  </p>
                  <p>
                    <strong>Age of birth:</strong> {team.coach.godiste}
                  </p>
                  <p>
                    <strong>Titles:</strong> {team.coach.brojtitula}
                  </p>
                </div>
              </div>
            </div>
            <div className="team-details">
              <div className="info">
                <h2>Team Details</h2>
                <p>
                  <strong>City:</strong> {team.grad}
                </p>
                <p>
                  <strong>Owner:</strong> {team.vlasnik}
                </p>
                <p>
                  <strong>Arena:</strong> {team.arenaName}
                </p>
              </div>
              <div className="stadium-container">
                <img src={staduimSeats} />
                <div className="capacity-number">{team.arenaCapacity}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="list-of-players">
          <h2>Players</h2>
          <ul>
            {players.map((player, index) => {
              return (
                <li key={index}>
                  <div className="player-info">
                    <h4>{player.ime} {player.prezime}</h4>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <footer className="team-footer">
        <button className="back-button" onClick={() => window.history.back()}>
          Back to Standings
        </button>
      </footer>
    </div>
  );
}

export default TeamPage;
