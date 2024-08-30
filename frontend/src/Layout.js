import React from "react";
import Header from "./components/Header";
import LatestMatch from "./components/LatestMatch";
import PlayersStatistics from "./components/PlayersStatistics";
import TeamTable from "./components/TeamTable";
import LeagueInfo from "./components/LeagueInfo";
import Footer from "./components/Footer";

const Layout = ({season, setSeason }) => {
  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <div className="app-components">
        <div className="left-half">
          <LeagueInfo setSeason={setSeason}/>
          <TeamTable season={season} />
        </div>
        <div className="right-half">
          <LatestMatch />
          <PlayersStatistics season={season} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
