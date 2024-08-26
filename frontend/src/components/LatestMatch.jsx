import teamLogos from "C:\\Projekti\\NBA-statistics-app\\frontend\\src\\teamLogos.js";

function LatestMatch({ latestMatchData }) {

  if (!latestMatchData?.domacin || !latestMatchData?.gost) {
    return <div>Loading...</div>;
  }
  const homeTeamLogo =
    teamLogos[
      latestMatchData.domacin.ime.toLowerCase().replace(/\s/g, "") + "Logo"
    ];

  const awayTeamLogo =
    teamLogos[
      latestMatchData.gost.ime.toLowerCase().replace(/\s/g, "") + "Logo"
    ];

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
