import teamLogos from "C:\\Projekti\\NBA-statistics-app\\frontend\\src\\teamLogos.js";

function TeamTable({ teamsWithStats }) {
  return (
    <div className="teamTable">
      <div className="table-info">
        <h3>#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Teams</h3>
        <div className="win-lose-info">
          <p className="playedMatches">P</p>
          <p>W</p>
          <p>L</p>
          <p>D</p>
        </div>
        <p>PTS</p>
      </div>
      <hr></hr>
      <ol>
        {teamsWithStats.map((team, index) => {
          const ukupnoUtakmica =
            parseInt(team.wins) + parseInt(team.losses) + parseInt(team.draws);

          const teamLogo =
            teamLogos[team.ime.toLowerCase().replace(/\s/g, "") + "Logo"];
          return (
            <li key={index}>
              <div className="logo-and-teamName">
                <p className="team-position">{index+1}</p>
                <div className="logo">
                  <img src={teamLogo} />
                </div>
                <div className="team-name">
                  <h3>{team.ime}</h3>
                </div>
              </div>
              <div className="win-lose">
                <p className="playedMatches">{ukupnoUtakmica}</p>
                <p>{team.wins}</p>
                <p>{team.losses}</p>
                <p>{team.draws}</p>
              </div>
              <p className="team-points">{team.points}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default TeamTable;
