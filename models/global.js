'use strict';

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
    jsonPath: 'data_files/json/'
}

GLOBAL_CONSTANTS.amountOfTeams = GLOBAL_CONSTANTS.teams.length,

module.exports = GLOBAL_CONSTANTS;

