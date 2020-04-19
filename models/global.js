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
    teams: ['Cardinals', 'Falcons', 'Ravens', 'Bills', 'Panthers', 'Bears', 'Bengals', 'Browns', 'Cowboys', 'Broncos', 'Lions', 'Packers', 'Texans', 'Colts', 'Jauars', 'Chiefs', 'Chargers', 'Rams', 'Dolphins', 'Vikings', 'Patriots', 'Saints', 'Giants', 'Jets', 'Raiders', 'Eagles', 'Steelers', '49ers', 'Seahawks', 'Buccaneers', 'Titans', 'Redskins'],
    cities: ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago', 'Cincinnati', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Green bay', 'Houston', 'Indianapolis', 'Jacksonville', 'Kansas City', 'Los Angeles', 'Los Angeles', 'Miami', 'Minnesota', 'New England', 'new orleans', 'New York', 'New York', 'Oakland', 'Philadelphia', 'Pittsburg', 'San Francisco', 'Seattle', 'Tampa Bay', 'Tennessee', 'Washington'],
    positions: ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Defense'],
    rbTableHeader: ['Name', 'Rushing Attempts', 'Rush Yards', 'Rushing Touchdowns', 'Receptions', 'Receiving Yards', 'Receiving Touchdowns', 'Fumbles'],
    receivingTableHeader: ['Name', 'Targets', 'Completions', 'Touchdowns', 'Receiving Yards'],
    qbTableHeader: ['Name', 'Passing Yards', 'Passing Touchdowns', 'Completion Percentage', 'Interceptions', 'Rushing Yards', 'Rushing Touchdowns'],
    teamCodes: ['crd', 'atl', 'rav', 'buf', 'car', 'chi', 'cin', 'cle', 'dal', 'den', 'det', 'gnb', 'htx', 'clt', 'jax', 'kan', 'sdg', 'ram', 'mia', 'min', 'nwe', 'nor', 'nyg', 'nyj', 'rai', 'phi', 'pit', 'sfo', 'sea', 'tam', 'oti', 'was'],
    weekCodes: ['week_1', 'week_2', 'week_3', 'week_4', 'week_5', 'week_6', 'week_7', 'week_8', 'week_9', 'week_10', 'week_11', 'week_12', 'week_13', 'week_14', 'week_15', 'week_16', 'week_17'],
    years: ['2018', '2019'],
    csvPath: 'data_files/csv/',
    jsonPath: 'data_files/json/',
    DefenseTableHeader: ['name', 'Points Against', 'Yards Against', 'Passing Yards Against', 'Passing TDs Against', 'Interceptions', 'Rushing Yards Against', 'Rushing TDs Against'],
    colors: ['#97233F', '#A71930', '#241773', '#00338D', '#0085CA', '#0B162A', '#FB4F14', '#311D00', '#041E42', '#FB4F14', '#0076B6', '#203731', '#03202F', '#002C5F', '#D7A22A', '#E31837', '#002A5E', '#002244', '#008E97', '#4F2683', '#002244', '#D3BC8D', '#0B2265', '#125740', '#A5ACAF', '#004C54', '#FFB612', '#AA0000', '#002244', '#D50A0A', '#0C2340', '#773141'];
}

GLOBAL_CONSTANTS.amountOfTeams = GLOBAL_CONSTANTS.teams.length,

module.exports = GLOBAL_CONSTANTS;
