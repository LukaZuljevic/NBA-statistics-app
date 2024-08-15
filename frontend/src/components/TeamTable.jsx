function TeamTable({ teams }) {
  return (
    <div className="teamTable">
      <ol>
        {teams.map((team, index) => (
          <li key={index}>{team.ime}</li>
        ))}
      </ol>
    </div>
  );
}

export default TeamTable;
