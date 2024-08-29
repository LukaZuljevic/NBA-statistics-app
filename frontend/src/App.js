import "./index.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AllPlayersStatistics from "./AllPlayersStatistics";
import TeamPage from "./TeamPage";

function App() {
  const [season, setSeason] = useState("22/23");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout season={season} setSeason={setSeason} />}
        ></Route>
        <Route
          path="/all-players-statistics"
          element={<AllPlayersStatistics />}
        ></Route>
        <Route path="/team/:teamId" element={<TeamPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
