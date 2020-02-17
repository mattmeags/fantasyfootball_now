'use strict';

// function getFullTeams() {
//     let fullTeamsArr = [];
//         this.teams.forEach((team, index) => {
//             fullTeamsArr.push(GLOBAL_CONSTANTS.cities[index] + ' ' + team);
//         });
//         return fullTeamsArr;
//     }
// }

const GLOBAL_CONSTANTS = {
    teams: ['Cardinals', 'Falcons', 'Ravens', 'Bills', 'Panthers', 'Bears', 'Bengals', 'Browns', 'Cowboys', 'Broncos', 'Lions', 'Packers', 'Texans', 'Colts', 'Jaguars', 'Chiefs', 'Chargers', 'Rams', 'Dolphins', 'Vikings', 'Patriots', 'Saints', 'Giants', 'Jets', 'Raiders', 'Eagles', 'Steelers', '49ers', 'Seahawks', 'Buccaneers', 'Titans', 'Redskins'],
    cities: ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago', 'Cincinnati', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Green bay', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'Los Angeles', 'Los Angeles', 'Miami', 'Minnesota', 'New England', 'new orleans', 'New York', 'New York', 'Oakland', 'Philadelphia', 'Pittsburg', 'San Francisco', 'Seattle', 'Tampa Bay', 'Tennessee', 'Washington'],
    positions: ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Defense'],
    rbTableHeader: ['Name', 'Rushing Attempts', 'Rush Yards', 'Rushing Touchdowns', 'Receptions', 'Receiving Yards', 'Receiving Touchdowns', 'Fumbles'],
    receivingTableHeader: ['Name', 'Targets', 'Completions', 'Touchdowns', 'Receiving Yards'],
    qbTableHeader: ['Name', 'Passing Yards', 'Passing Touchdowns', 'Completion Percentage', 'Interceptions', 'Rushing Yards', 'Rushing Touchdowns'],
    colors: ['#97233F', '#A71930', '#241773', '#00338D', '#0085CA', '#0B162A', '#FB4F14', '#311D00', '#041E42', '#FB4F14', '#0076B6', '#203731', '#03202F', '#002C5F', '#D7A22A', '#E31837', '#002A5E', '#002244', '#008E97', '#4F2683', '#002244', '#002244', '#D3BC8D', '#0B2265', '#125740', '#A5ACAF', '#004C54', '#FFB612', '#AA0000', '#002244', '#D50A0A', '#0C2340', '#773141'],
    fullTeams: function() {
        let fullTeamsArr = [];
        this.teams.forEach((team, index) => {
            fullTeamsArr.push(this.cities[index] + ' ' + team);
        });
        console.log(fullTeamsArr);
        return fullTeamsArr;
    },
}

GLOBAL_CONSTANTS.amountOfTeams = GLOBAL_CONSTANTS.teams.length,

module.exports = GLOBAL_CONSTANTS;
