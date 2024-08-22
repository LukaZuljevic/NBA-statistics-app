import Header from "./components/Header";
import TeamTable from "./components/TeamTable";
import LeagueInfo from "./components/LeagueInfo";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [teams, setTeams] = useState([]);
  const [omjerPobjeda, setOmjerPobjeda] = useState([]);
  const [brojPoena, setBrojPoena] = useState([]);
  const [sezona, setSezona] = useState("22/23");

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
        .get(`http://localhost:5000/omjerPobjeda${sezona}`)
        .then((response) => {
          const data = response.data;
          setOmjerPobjeda(data);
        });
    };

    fetchData();
  }, [sezona]);

  //fetching points data for each team
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/brojPoena${sezona}`)
        .then((response) => {
          const data = response.data;
          setBrojPoena(data);
        });
    };

    fetchData();
  }, [sezona]);

  const teamsWithStats = teams.map((team) => {
    const result = omjerPobjeda.find((omjer) => omjer.team === team.ime);
    const points = brojPoena.find((poeni) => poeni.team === team.ime);

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
      <Header />
      <LeagueInfo setSezona={setSezona} />
      <TeamTable teamsWithStats={teamsWithStats} />
    </div>
  );
}

export default App;
