import { useLocation } from "react-router-dom";
import noPlayerPicture from "../assets/noPlayerIcon.svg";
import jersey from "../assets/jersey.png";

function PlayerPage() {
  const location = useLocation();
  const { player } = location.state;

  const playerPositions = ["PG", "SG", "SF", "PF", "C"];

  return (
    <div className="player-page">
      <header>
        <h1>
          {player.ime} {player.prezime}
        </h1>
      </header>

      <div className="player-card">
        <img
          className="player-picture"
          src={noPlayerPicture}
          alt="player picture"
        />

        <div className="player-details">
          <div className="player-info">
            <h2>{player.name}</h2>
            <p>
              <strong>Position:</strong> {playerPositions[player.pozicija - 1]}
            </p>
            <p>
              <strong>Date of birth:</strong> {player.godiste}
            </p>
            <p>
              <strong>Height:</strong> {player.visina} cm
            </p>
            <p>
              <strong>Weight:</strong> {player.tezina} kg
            </p>
          </div>

          <div className="jersey-container">
            <img className="jersey" src={jersey} alt="jersey" />
            <span className="jersey-surname">{player.prezime}</span>
            <span className="jersey-number">{player.brojdresa}</span>
          </div>
        </div>
      </div>
      <footer className="team-footer">
        <button className="back-button" onClick={() => window.history.back()}>
          Back to Team Page
        </button>
      </footer>
    </div>
  );
}

export default PlayerPage;
