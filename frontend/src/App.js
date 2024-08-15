import Header from "./components/Header";
import TeamTable from "./components/TeamTable";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/igrac");
      const data = await response.json();
      console.log(data);
      setTeams(data);
    };
    fetchData();
  }, []);

  console.log(teams);

  return (
    <div className="container">
      <Header />
      <TeamTable teams={teams} />
    </div>
  );
}

export default App;
