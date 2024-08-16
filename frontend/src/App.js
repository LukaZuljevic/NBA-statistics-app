import Header from "./components/Header";
import TeamTable from "./components/TeamTable";
import LeagueInfo from "./components/LeagueInfo";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [teams, setTeams] = useState([]);

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

  return (
    <div className="container">
      <Header />
      <LeagueInfo />
      <TeamTable teams={teams} />
    </div>
  );
}

export default App;
