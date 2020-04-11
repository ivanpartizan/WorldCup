const url1 = "http://api.football-data.org/v2/competitions/2000/matches";
const url2 = "http://api.football-data.org/v2/competitions/2000/standings";

async function getResults() {
  const response = await fetch(url1, {
    method: "GET",
    headers: {
      "X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
    },
  });
  const data1 = await response.json();
  console.log(data1);

  document.getElementById(
    "matches"
  ).innerHTML = `<h2>Matches</h2><table><tr>${data1.matches
    .map(
      (match) => `<td>${match.group}</td>
      <td class='${match.score.winner === "HOME_TEAM" ? "winner" : "loser"}'>
      ${match.homeTeam.name}</td> 
      <td class='${match.score.winner === "AWAY_TEAM" ? "winner" : "loser"}'>
      ${match.awayTeam.name}</td> 
      <td>${match.score.fullTime.homeTeam}</td> <td>-</td> 
      <td>${match.score.fullTime.awayTeam}</td> 
      <td>(${match.score.halfTime.homeTeam} - ${
        match.score.halfTime.awayTeam
      })</td> 
      <td>${
        match.score.extraTime.homeTeam !== null
          ? match.score.extraTime.homeTeam + " -"
          : ""
      } ${
        match.score.extraTime.awayTeam !== null
          ? match.score.extraTime.awayTeam + " ET"
          : ""
      } </td>
      <td>${
        match.score.penalties.homeTeam !== null
          ? match.score.penalties.homeTeam + " -"
          : ""
      } ${
        match.score.penalties.awayTeam !== null
          ? match.score.penalties.awayTeam + " PEN"
          : ""
      } </td>
      
      </tr>`
    )
    .join("")}</table>  
  `;
}

async function getStandings() {
  const response = await fetch(url2, {
    method: "GET",
    headers: {
      "X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
    },
  });
  const data2 = await response.json();
  console.log(data2);

  document.getElementById("standings").innerHTML = `<div class='champion'>
  <h2>Champion: ${data2.season.winner.name}</h2> <img src='${
    data2.season.winner.crestUrl
  }' width=500></div> 
  ${data2.standings
    .map(
      (table) =>
        `${
          table.type === "TOTAL"
            ? ` <h2>Group ${table.group.slice(6)}:</h2> <table>
            <tr><td></td><td>P</td><td>W</td><td>D</td><td>L</td><td>GF</td><td>GA</td><td>GD</td></tr>
  <tr><td>${table.table[0].team.name}</td> <td>${table.table[0].points}</td>  
  <td>${table.table[0].won}</td> <td>${table.table[0].draw}</td>  
  <td>${table.table[0].lost}</td> <td>${table.table[0].goalsFor}</td>  
  <td>${table.table[0].goalsAgainst}</td> <td>${
                table.table[0].goalDifference
              }</td></tr>  
  <tr><td>${table.table[1].team.name}</td> <td>${table.table[1].points}</td>
  <td>${table.table[1].won}</td> <td>${table.table[1].draw}</td> 
  <td>${table.table[1].lost}</td> <td>${table.table[1].goalsFor}</td> 
  <td>${table.table[1].goalsAgainst}</td> <td>${
                table.table[1].goalDifference
              }</td></tr>  
  <tr><td>${table.table[2].team.name}</td> <td>${table.table[2].points}</td> 
  <td>${table.table[2].won}</td> <td>${table.table[2].draw}</td> 
  <td>${table.table[2].lost}</td> <td>${table.table[2].goalsFor}</td> 
  <td>${table.table[2].goalsAgainst}</td> <td>${
                table.table[2].goalDifference
              }</td></tr>  
  <tr><td>${table.table[3].team.name}</td> <td>${table.table[3].points}</td> 
  <td>${table.table[3].won}</td> <td>${table.table[3].draw}</td> 
  <td>${table.table[3].lost}</td> <td>${table.table[3].goalsFor}</td> 
  <td>${table.table[3].goalsAgainst}</td> <td>${
                table.table[3].goalDifference
              }</td></tr>
  </table>`
            : ""
        }`
    )
    .join("")}`;
}

getResults();
getStandings();
