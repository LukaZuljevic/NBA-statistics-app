import "./index.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AllPlayersStatistics from "./pages/AllPlayersStatistics";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";

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
        <Route path="/player/:playerId" element={<PlayerPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
