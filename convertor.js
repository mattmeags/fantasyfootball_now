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

function onError() {
    console.log('Error for Convert to csv ');
    return;
}

//TODO rename this file
var initTeam = async (team) => {

    let playerData = {};
    let playerFile = './models/' + team + '/players.csv',
        passingFile = './models/' + team + '/passing.csv';

    const rushRecData = await convertCSV(playerFile);
    const passingData = await convertCSV(passingFile);

    playerData.rushRec = rushRecData;
    playerData.passing = passingData;

    return playerData;
    
};

var convertCSV = async (csvFile) => {

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