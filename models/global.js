'use strict';

const teams = ['Cardinals','Falcons' ,'Ravens' ,'Bills' ,'Panthers' ,'Bears' ,'Bengals' ,'Browns' ,'Cowboys' ,'Broncos' ,'Lions' ,'Packers' ,'Texans' ,'Colts','Cheifs' ,'Chargers' ,'Rams' ,'Dolphins' ,'Vikings' ,'Patriots' ,'Saints' ,'Giants', 'Jets' ,'Raiders' ,'Eagles', 'Steelers', '49ers', 'Seahawks', 'Buccaneers', 'Titans', 'Redskins'];

const amountOfTeams = teams.length;

const cities = ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago', 'Cincinnati', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Green bay', 'Houston', 'Indianapolis', 'Kansas City', 'Los Angeles', 'Los Angeles', 'Miami', 'Minnesota', 'New England', 'new orleans', 'New York', 'New York', 'Oakland', 'Philadelphia', 'Pittsburg', 'San Francisco', 'Seattle', 'Tampa Bay', 'Tennessee', 'Washington'];

const positions = ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Defense'];

// class FullTeam {
//     constructor(team, city) {
//         this.team = team;
//         this.city = city;
//     }
// }

const createFullTeams = () => {
    let fullTeamsArr = [];
    teams.forEach((team, index) => {
        fullTeamsArr.push(cities[index] + ' ' + team);
    });
    return fullTeamsArr;
}

const fullTeams = createFullTeams();

module.exports = {
    teams: teams,
    amountOfTeams: amountOfTeams,
    positions: positions,
    cities: cities,
    fullTeams: fullTeams
}
