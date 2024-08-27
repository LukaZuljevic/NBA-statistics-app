import teamLogos from "C:\\Projekti\\NBA-statistics-app\\frontend\\src\\teamLogos.js";
import { useEffect, useState } from "react";
import axios from "axios";

function LatestMatch() {
  const [teams, setTeams] = useState([]);
  const [latestMatch, setLatestMatch] = useState([]);
  const [matches, setMatches] = useState([]);

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

  while (teams.length === 0) {
    return <div>Loading...</div>;
  }

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

  if (!latestMatchData?.domacin || !latestMatchData?.gost) {
    return <div>Loading...</div>;
  }

  //getting the logos for the teams
  const homeTeamLogo =
    teamLogos[
      latestMatchData.domacin.ime.toLowerCase().replace(/\s/g, "") + "Logo"
    ];

  const awayTeamLogo =
    teamLogos[
      latestMatchData.gost.ime.toLowerCase().replace(/\s/g, "") + "Logo"
    ];

  //getting the date of the match
  const date =
    latestMatchData && latestMatchData.datum
      ? latestMatchData.datum.split("T")[0]
      : "";

  return (
    <div className="latest-match">
      <h2>Latest Match</h2>

      <div className="latest-match-content">
        <div className="team">
          <img src={homeTeamLogo} />
          <h5>{latestMatchData.domacin.ime}</h5>
        </div>

        <div className="score">
          <h4>
            {latestMatchData.gost.brojkoseva} <span className="dash">-</span>{" "}
            {latestMatchData.domacin.brojkoseva}
          </h4>
          <p className="match-date">{date}</p>
        </div>

        <div className="team">
          <img src={awayTeamLogo} />
          <h5>{latestMatchData.gost.ime}</h5>
        </div>
      </div>
    </div>
  );
}

export default LatestMatch;
