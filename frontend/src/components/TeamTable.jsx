import teamLogos from "C:\\Projekti\\NBA-statistics-app\\frontend\\src\\teamLogos.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeamTable({ season }) {
  const [winLossPercentage, setWinLossPercentage] = useState([]);
  const [teamPoints, setTeamPoints] = useState([]);
  const [teams, setTeams] = useState([]);
  const [arenas, setArenas] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const navigate = useNavigate();

  const handleTeamClick = (team) => {
    navigate(`/team/${team.ime}`, { state: { team } });
  };

  //fetching coach data
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/trener").then((response) => {
        const data = response.data;
        setCoaches(data);
      });
    };

    fetchData();
  }, []);

  //fetching team arena data
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/dvorane").then((response) => {
        const data = response.data;
        setArenas(data);
      });
    };

    fetchData();
  }, []);

  //fetching teams info data
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/momcad").then((response) => {
        const data = response.data;
        setTeams(data);
      });
    };

    fetchData();
  }, []);

  //fetching wins, losses and draws data for each team
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/omjerPobjeda${season}`)
        .then((response) => {
          const data = response.data;
          setWinLossPercentage(data);
        });
    };

    fetchData();
  }, [season]);

  //fetching points data for each team
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/brojPoena${season}`)
        .then((response) => {
          const data = response.data;
          setTeamPoints(data);
        });
    };

    fetchData();
  }, [season]);

  //merging all the teams data into one object
  const teamsWithStats = teams.map((team) => {
    const result = winLossPercentage.find((omjer) => omjer.team === team.ime);
    const points = teamPoints.find((points) => points.team === team.ime);
    const arena = arenas.find((arena) => arena.id === team.id_stadion);
    const coach = coaches.find((coach) => coach.id_momcad === team.id);

    return {
      ...team,
      coach: coach,
      arenaName: arena ? arena.ime : "Unknown",
      arenaCapacity: arena ? arena.broj_sjedala : "Unknown",
      wins: result ? result.wins : 0,
      losses: result ? result.losses : 0,
      draws: result ? result.draws : 0,
      points: points ? points.total_points : 0,
    };
  });

  //sorting teams by points(2 points for win, 1 point for draw)
  const sortedTeams = [...teamsWithStats]
    .map((team) => {
      const teamPoints = parseInt(team.wins) * 2 + parseInt(team.draws);
      return { ...team, teamPoints };
    })
    .sort((a, b) => b.teamPoints - a.teamPoints);

  console.log(sortedTeams[0]);

  return (
    <div className="teamTable">
      <h4 className="standings">Standings</h4>
      <div className="table-info">
        <h3>#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Teams</h3>
        <div className="win-lose-info">
          <p className="playedMatches">P</p>
          <p>W</p>
          <p>L</p>
          <p>D</p>
        </div>
        <p className="points-info">PTS</p>
      </div>
      <hr></hr>
      <ol>
        {sortedTeams.map((team, index) => {
          const ukupnoUtakmica =
            parseInt(team.wins) + parseInt(team.losses) + parseInt(team.draws);

          const teamLogo =
            teamLogos[team.ime.toLowerCase().replace(/\s/g, "") + "Logo"];

          const teamPoints = parseInt(team.wins) * 2 + parseInt(team.draws);

          return (
            <li onClick={() => handleTeamClick(team)} key={index}>
              <div className="logo-and-teamName">
                <p className="team-position">{index + 1}</p>
                <div className="logo">
                  <img src={teamLogo} />
                </div>
                <div className="teams-name">
                  <h3>{team.ime}</h3>
                </div>
              </div>
              <div className="win-lose">
                <p className="playedMatches">{ukupnoUtakmica}</p>
                <p>{team.wins}</p>
                <p>{team.losses}</p>
                <p>{team.draws}</p>
              </div>
              <p className="team-points">{teamPoints}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default TeamTable;
