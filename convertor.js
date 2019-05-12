'use strict';

const csvtojson = require('csvtojson');

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

/**
 * @function onError
 * @description - handles a clean error if csv convert fails
 */
function onError() {
    console.log('Error for Convert to csv ');
    return;
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
const convertCSV = async (csvFile) => {

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

module.exports.initTeam = initTeam;