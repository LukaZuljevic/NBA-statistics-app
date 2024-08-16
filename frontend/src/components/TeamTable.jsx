function TeamTable({ teams }) {
  return (
    <div className="teamTable">
      <div className="table-info">
        <h3>Teams</h3>
        <div className="win-lose-info">
              <p>P</p>
              <p>W</p>
              <p>L</p>
            </div>
        <p>PTS</p>
      </div>
      <hr></hr>
      <ol>
        {teams.map((team, index) => (
          <li key={index}>
            <div className="team-name">
              <h3>{team.ime_momcad}</h3>
            </div>
            <div className="win-lose">
              <p>0</p>
              <p>0</p>
              <p>0</p>
            </div>
            <p>poeni</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TeamTable;
