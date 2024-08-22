function TeamTable({ teamsWithStats }) {
  return (
    <div className="teamTable">
      <div className="table-info">
        <h3>Teams</h3>
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
          return (
            <li key={index}>
              <div className="team-name">
                <h3>{team.ime}</h3>
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
