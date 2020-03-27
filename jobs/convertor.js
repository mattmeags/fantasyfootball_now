'use strict';

const csvtojson = require('csvtojson');
const fs = require('fs-extra');
const headers = require('./data/headers');
const teams = require('../models/global').teams;

const jsonPath = 'data_files/json/';
const csvPath = 'data_files/csv/';

/**
 * @function onError
 * @description - handles a clean error if csv convert fails
 */
function onError() {
    console.log('Error for Convert to csv ');
    return;
}

/**
 * @function allTeam
 * @description - creates all statics JSON data
 */
async function allTeam() {
    const allPath = csvPath + 'all/';

    const allOffenseData = await convertCSV(allPath + 'allTeamOffense.csv', headers.allTeamOffenseHeader);
    const allDefenseData = await convertCSV(allPath + 'allTeamDefense.csv', headers.allTeamDefenseHeader);
    const allPassOffenseData = await convertCSV(allPath + 'passingOffense.csv', headers.allTeamPassingOffense, true);
    const allPassDefenseData = await convertCSV(allPath + 'passingDefense.csv', headers.allTeamPassingDefense, true);
    const allRushOffenseData = await convertCSV(allPath + 'rushingOffense.csv', headers.allTeamRushingOffense, true);
    const allRushDefenseData = await convertCSV(allPath + 'rushingDefense.csv', headers.allTeamRushingDefense, true);

    const allData = {
        offense: allOffenseData,
        defense: allDefenseData,
        passOffense: allPassOffenseData,
        passDefense: allPassDefenseData,
        rushOffense: allRushOffenseData,
        rushDefense: allRushDefenseData
    }
    await Object.keys(allData).forEach(async (element) => {
        console.log(element);
        await fs.outputFile(jsonPath + 'all/' + element + '.js', 'module.exports = ' + JSON.stringify(allData[element]));
    });
}

/**
 * @function initTeam
 * @param {string} team - team name so gets right data
 * @description creates playerData object used on teams page
 */
async function initTeam(team) {

    let rushRedFile = csvPath + team + '/rushRec.csv',
        passingFile = csvPath + team + '/passing.csv';

    const rushRecData = await convertCSV(rushRedFile, headers.playerHeader);
    const passingData = await convertCSV(passingFile, headers.playerPassing, true);

    await fs.outputFile(jsonPath + team + '/rushRec.js', 'module.exports = ' +  JSON.stringify(rushRecData));
    await fs.outputFile(jsonPath + team + '/passing.js', 'module.exports = ' +  JSON.stringify(passingData));  
};

/**
 * @function convertCSV
 * @param {string} csvFile - path to csv file to convert
 * @description converts csv files into json objects, returns object
 */
async function convertCSV(csvFile, header, skipExtraRow = false) {

    return await csvtojson({
        noheader: false,
        headers: header
    })
    .fromFile(csvFile)
    .then((jsonObj) => {
        console.log('resolved');
        //remove original header
        if (!skipExtraRow) {
            jsonObj.shift();
        }
        //console.log(playerData);
        return jsonObj;
    }, onError);

} 

async function init() {
    await allTeam();
    
    teams.forEach(async (team) => {
        await initTeam(team);
    });
}
init();
