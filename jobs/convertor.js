'use strict';

const csvtojson = require('csvtojson');
const fs = require('fs-extra');

//global player csv header
const playerHeader = [
    'number',
    'playerName',
    'age',
    'position',
    'gamesPlayed',
    'gamesStarted',
    'rushingAttempts',
    'rushYards',
    'rushTD',
    'longestRushAttempt',
    'yardsPerAttempt',
    'yardsPerGame',
    'rushAttemptsPerGame',
    'recTargets',
    'receptions',
    'recYards',
    'yardsPerRec',
    'recTD',
    'longestRec',
    'recPerGame',
    'recYardsPerGame',
    'completionPercentage',
    'totalTouches',
    'yardsPerTouch',
    'yardsFromScrimage',
    'totalTD',
    'fumbles'
];

const allOffenseHeader = [
    'rank',
    'name',
    'games',
    'pointsScored',
    'totalYards',
    'totalPlays',
    'yardsPerPlay',
    'turnOvers',
    'fumblesLost',
    'firstDowns',
    'passCompleted',
    'passAttempts',
    'passYards',
    'passTDs',
    'interceptions',
    'netYardsPerAttempt',
    'passFirstDowns',
    'rushAttempts',
    'rushYrds',
    'rushTDs',
    'rushYardsPerAttempt',
    'rushFirstDowns',
    'penalties',
    'penaltyYards',
    'firstDownsByPenalty',
    'driveScorePercentage',
    'driveTurnOverPercentage',
    'expectedPoints'
]

const allOffenseHeader = [
    'rank',
    'name',
    'games',
    'passesCompleted',
    'passesAttempted',
    'passCompletedPercentage',
    'yardsPerPass',
    'passingTouchdowns',
    'passTDPercentage',
    'interceptions',
    'intPercentage',
    'longestPass',
    'yardsPerAttempt',
    'adjustedYardsPerAttempt',
    'yardsPerCompletion',
    'yardsPerGame',
    'QBR',
    'sacks',
    'yardsLostToSacks',
    'netYardsPerAttempt',
    'adjustedNetYardsPerAttempt',
    'sackPercentage',
    '4thQuarterComebacks',
    'gameWinningDrives',
    'expectedPoints'
]

const rushingOffenseHeader = [

]

/**
 * @function onError
 * @description - handles a clean error if csv convert fails
 */
function onError() {
    console.log('Error for Convert to csv ');
    return;
}

const allPath = '../data_files/csv/all/';

const allTeam = async () => {
    // fs.readdir(allPath, (err, allFiles) => {
    //     console.log(allFiles);
    //     allFiles.forEach((element) => {
    //         let allCSV = filePath + element;
    //         convertCSV(allCSV);
    //     });
    // });
    const allOffenseData = await convertCSV(allPath + 'allTeamOffense.csv', allOffenseHeader);
    const allDefenseData = await convertCSV(allPath + 'allTeamDefense.csv', );
}

const allPassTeam = async () => {
    const allPassOffenseData = await convertCSV(allPath + 'passingOffense.csv');
    const allPassDefenseData = await convertCSV(allPath + 'passingDefense.csv');
}

const allRushTeam = async () => {
    const allRushOffenseData = await convertCSV(allPath + 'rushingOffense.csv');
    const allRushDefenseData = await convertCSV(allPath + 'rushingDefense.csv');
}

/**
 * @function initTeam
 * @param {string} team - team name so gets right data
 * @description creates playerData object used on teams page
 */
const initTeam = async (team) => {

    let playerData = {};
    let playerFile = './models/' + team + '/players.csv',
        passingFile = './models/' + team + '/passing.csv';

    const rushRecData = await convertCSV(playerFile);
    const passingData = await convertCSV(passingFile);

    playerData.rushRec = rushRecData;
    playerData.passing = passingData;

    return playerData;
    
};

/**
 * @function convertCSV
 * @param {string} csvFile - path to csv file to convert
 * @description converts csv files into json objects, returns object
 */
const convertCSV = async (csvFile, header) => {

    return await csvtojson({
        noheader: false,
        headers: playerHeader
    })
    .fromFile(csvFile)
    .then((jsonObj) => {
        console.log('resolved');
        let playerData = jsonObj;
        //remove original header
        playerData.shift();
        //console.log(playerData);
        return playerData;
    }, onError);

} 

//module.exports.initTeam = initTeam;
var init = () => {
    allTeam();
}
init();