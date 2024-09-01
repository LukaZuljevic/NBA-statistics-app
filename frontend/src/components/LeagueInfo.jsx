import nbaLogo from "../assets/nba-logo.png";
import usFlag from "../assets/usFlag.png";

function LeagueInfo({ setSeason }) {
  return (
    <div className="league-bar">
      <img className="league-logo" src={nbaLogo} alt="league-logo" />
      <div className="league-info">
        <h1>NBA</h1>
        <div className="usa-section">
          <img src={usFlag} />
          <h4>USA</h4>
          <select
            className="season-select"
            onChange={(e) => setSeason(e.target.value)}
          >
            <option>22/23</option>
            <option>23/24</option>
            <option>24/25</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default LeagueInfo;
