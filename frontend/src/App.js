import Header from "./components/Header";
import TeamTable from "./components/TeamTable";
import LeagueInfo from "./components/LeagueInfo";
import LatestMatch from "./components/LatestMatch";
import PlayersStatistics from "./components/PlayersStatistics";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [teams, setTeams] = useState([]);
  const [winLossPercentage, setWinLossPercentage] = useState([]);
  const [teamPoints, setTeamPoints] = useState([]);
  const [season, setSeason] = useState("22/23");
  const [latestMatch, setLatestMatch] = useState([]);
  const [matches, setMatches] = useState([]);
  const [playerStatistics, setPlayerStatistics] = useState([]);

  //fetching data for the latest match that was played
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/zadnjaUtakmica`)
        .then((response) => {
          const data = response.data;
          setLatestMatch(data);
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

  //fetching for all matches that were played
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/utakmice").then((response) => {
        const data = response.data;
        setMatches(data);
      });
    };

    fetchData();
  }, []);

  //fetching player statistics data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/statistikaIgraca${season}`)
        .then((response) => {
          const data = response.data;
          setPlayerStatistics(data);
        });
    };

    fetchData();
  }, [season]);

  //filtering the latest match data
  const latestMatchTeamsId = matches.filter(
    (match) => match.id_utakmica === latestMatch[0].id
  );

  const latestMatchTeams = latestMatchTeamsId.map((team) => {
    const teamName = teams.find((t) => t.id === team.id_momcad);

    return { ...team, ime: teamName.ime };
  });

  const latestMatchData = {
    domacin: latestMatchTeams[0],
    gost: latestMatchTeams[1],
    id: latestMatch[0]?.id,
    sudac: latestMatch[0]?.sudac,
    rang: latestMatch[0]?.rang,
    datum: latestMatch[0]?.datum,
  };

  //merging all the teams data into one object
  const teamsWithStats = teams.map((team) => {
    const result = winLossPercentage.find((omjer) => omjer.team === team.ime);
    const points = teamPoints.find((points) => points.team === team.ime);

    return {
      ...team,
      wins: result ? result.wins : 0,
      losses: result ? result.losses : 0,
      draws: result ? result.draws : 0,
      points: points ? points.total_points : 0,
    };
  });

  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <div className="app-components">
        <div className="left-half">
          <LeagueInfo setSeason={setSeason} />
          <TeamTable teamsWithStats={teamsWithStats} />
        </div>
        <div className="right-half">
          <LatestMatch latestMatchData={latestMatchData} />
          <PlayersStatistics playerStatistics={playerStatistics} />
        </div>
      </div>
    </div>
  );
}

export default App;
