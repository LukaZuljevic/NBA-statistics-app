import Header from "./components/Header";
import TeamTable from "./components/TeamTable";
import LeagueInfo from "./components/LeagueInfo";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [teams, setTeams] = useState([]);
  const [omjerPobjeda, setOmjerPobjeda] = useState([]);
 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/igrac");
  //     const data = await response.json();
  //     console.log(data);
  //     setTeams(data);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/momcad").then((response) => {
        const data = response.data;
        setTeams(data);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/omjerPobjeda").then((response) => {
        const data = response.data;
        setOmjerPobjeda(data);
      });
    };

    fetchData();
  }, []);

  const teamsWithResults = teams.map(team => {
    const result = omjerPobjeda.find(omjer => omjer.team === team.ime);
  
    return {
      ...team,
      wins: result ? result.wins : 0,  
      losses: result ? result.losses : 0,
      draws: result ? result.draws : 0
    };
  });

  return (
    <div className="container">
      <Header />
      <LeagueInfo />
      <TeamTable teamsWithResults={teamsWithResults}  />
    </div>
  );
}

export default App;
