'use strict';

const createFullTeams = () => {
    let fullTeamsArr = [];
    teams.forEach((team, index) => {
        fullTeamsArr.push(cities[index] + ' ' + team);
    });
    return fullTeamsArr;
}

const GLOBAL_CONSTANTS = {
    teams: ['Cardinals', 'Falcons', 'Ravens', 'Bills', 'Panthers', 'Bears', 'Bengals', 'Browns', 'Cowboys', 'Broncos', 'Lions', 'Packers', 'Texans', 'Colts', 'Cheifs', 'Chargers', 'Rams', 'Dolphins', 'Vikings', 'Patriots', 'Saints', 'Giants', 'Jets', 'Raiders', 'Eagles', 'Steelers', '49ers', 'Seahawks', 'Buccaneers', 'Titans', 'Redskins'],
    amountOfTeams: this.teams.length,
    cities: ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago', 'Cincinnati', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Green bay', 'Houston', 'Indianapolis', 'Kansas City', 'Los Angeles', 'Los Angeles', 'Miami', 'Minnesota', 'New England', 'new orleans', 'New York', 'New York', 'Oakland', 'Philadelphia', 'Pittsburg', 'San Francisco', 'Seattle', 'Tampa Bay', 'Tennessee', 'Washington'],
    positions: ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Defense'],
    fullTeams: createFullTeams(),
}

module.exports = GLOBAL_CONSTANTS;

