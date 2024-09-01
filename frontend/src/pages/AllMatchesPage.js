import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import teamLogos from "../teamLogos";

function AllMatchesPage() {
  const [matchesInfo, setMatchesInfo] = useState([]);
  const [beginDate, setBeginDate] = useState("2022-10-18");
  const [endDate, setEndDate] = useState("2025-06-15");

  const location = useLocation();
  const { matches, teams } = location.state;

  //fetching info for all matches that were played
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/utakmiceInfo")
        .then((response) => {
          const data = response.data;
          setMatchesInfo(data);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    };

    fetchData();
  }, []);

  if (matchesInfo.length === 0) {
    return <div>Loading...</div>;
  }

  const orderedMatches = Object.values(
    matches.reduce((acc, match) => {
      const matchId = match.id_utakmica;

      if (!acc[matchId]) {
        acc[matchId] = {
          id: matchId,
          domaci: null,
          gosti: null,
        };
      }

      if (match.domacigosti === "domaci") {
        acc[matchId].domaci = match;
      } else if (match.domacigosti === "gosti") {
        acc[matchId].gosti = match;
      }

      return acc;
    }, {})
  );

  //adjusting the data for all matches that were played
  const adjustedMatches = orderedMatches.map((match) => {
    const matchInfo = matchesInfo.find((info) => info.id === match.id);
    const matchDate = matchInfo
      ? new Date(matchInfo.datum.split("T")[0])
      : null;

    return {
      ...match,

      domaci: {
        ...match.domaci,
        ime: teams.find((team) => team.id === match.domaci.id_momcad).ime,
      },

      gosti: {
        ...match.gosti,
        ime: teams.find((team) => team.id === match.gosti.id_momcad).ime,
      },

      datum: matchDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
  });

  //filtering matches based on the selected date range
  const filteredMatches = adjustedMatches
    .filter((match) => {
      const matchDate = new Date(match.datum);
      const begin = new Date(beginDate);
      const end = new Date(endDate);

      return matchDate >= begin && matchDate <= end;
    })
    .sort((a, b) => new Date(a.datum) - new Date(b.datum));

  return (
    <div className="all-matches">
      <header>
        <h1>All Matches</h1>
      </header>
      <div className="select-season">
        <div>
          <label>Start date:</label>
          <input
            type="date"
            id="start-date"
            value={beginDate}
            onChange={(e) => setBeginDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <ul className="list-of-matches">
        {filteredMatches.map((match, index) => (
          <div className="single-match" key={index}>
            <div className="home-team">
              {
                <img
                  src={
                    teamLogos[
                      match.domaci.ime.toLowerCase().replace(/\s/g, "") + "Logo"
                    ]
                  }
                />
              }
              <h5>{match.domaci.ime}</h5>
            </div>

            <div className="result">
              <h4>
                {match.domaci.brojkoseva} <span className="dash">-</span>
                {match.gosti.brojkoseva}
              </h4>
              {<p className="match-date">{match.datum}</p>}
            </div>

            <div className="away-team">
              {
                <img
                  src={
                    teamLogos[
                      match.gosti.ime.toLowerCase().replace(/\s/g, "") + "Logo"
                    ]
                  }
                />
              }
              <h5>{match.gosti.ime}</h5>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AllMatchesPage;
