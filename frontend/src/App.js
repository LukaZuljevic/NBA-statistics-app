import "./index.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AllPlayersStatisticsPage from "./pages/AllPlayersStatisticsPage";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";
import AllMatchesPage from "./pages/AllMatchesPage";

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
          path="/statistics"
          element={<AllPlayersStatisticsPage />}
        ></Route>
        <Route path="/team/:teamId" element={<TeamPage />}></Route>
        <Route path="/player/:playerId" element={<PlayerPage />}></Route>
        <Route path="/matches" element={<AllMatchesPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
