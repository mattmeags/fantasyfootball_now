'use strict';

const csvtojson = require('csvtojson'),
    fs = require('fs-extra'),
    headers = require('./data/headers'),
    globals = require('../models/global'),
    jsonPath = globals.jsonPath,
    csvPath = globals.csvPath;

//TODO: update comments
/**
 * @function onError
 * @description - handles a clean error if csv convert fails
 */
function onError(error) {
    console.log(error)
    console.log('Error for Convert to csv ');
    return;
}

/**
 * @function allTeam
 * @param {string} year
 * @description - creates all statics JSON data
 */
async function allTeam(year) {
    const allPath = `${csvPath}all/${year}/`;

    const allOffenseData = await convertCSV(allPath + 'allTeamOffense.csv', headers.allTeamOffenseHeader);
    const allDefenseData = await convertCSV(allPath + 'allTeamDefense.csv', headers.allTeamDefenseHeader);
    const allPassOffenseData = await convertCSV(allPath + 'passingOffense.csv', headers.allTeamPassingOffense);
    const allPassDefenseData = await convertCSV(allPath + 'passingDefense.csv', headers.allTeamPassingDefense);
    const allRushOffenseData = await convertCSV(allPath + 'rushingOffense.csv', headers.allTeamRushingOffense);
    console.log(allRushOffenseData);
    const allRushDefenseData = await convertCSV(allPath + 'rushingDefense.csv', headers.allTeamRushingDefense);

    const allData = {
        offense: allOffenseData,
        defense: allDefenseData,
        passOffense: allPassOffenseData,
        passDefense: allPassDefenseData,
        rushOffense: allRushOffenseData,
        rushDefense: allRushDefenseData
    }

    //TODO: this can change I thnk
    await Object.keys(allData).forEach(async (element) => {
        console.log(element);
        await fs.outputFile(jsonPath + 'all/' + element + '.js', 'module.exports = ' + JSON.stringify(allData[element]));
    });
}

/**
 * @function initTeam
 * @param {string} team - team name so gets right data
 * @param {string} year
 * @description creates playerData object used on teams page
 */
async function initTeam(team, year) {
    const teamCSVPath = `${csvPath}${team}/${year}/`,
        teamJsonPath = `${jsonPath}${team}/${year}/`,
        rushRecFile = `${teamCSVPath}rushRec.csv`,
        passingFile = `${teamCSVPath}passing.csv`,
        rushRecData = await convertCSV(rushRecFile, headers.playerHeader),
        passingData = await convertCSV(passingFile, headers.playerPassing, false);

    await fs.outputFile(`${teamJsonPath}rushRec.js`, 'module.exports = ' + JSON.stringify(rushRecData));
    await fs.outputFile(`${teamJsonPath}passing.js`, 'module.exports = ' + JSON.stringify(passingData));

    // Create weekly team files
    for (let i = 0; i < globals.weekCodes.length; i++) {
        const week = globals.weekCodes[i],
            weekFile = `${teamCSVPath}${week}.csv`;

        // check file exists, so no error is thrown for bye week
        await fs.access(weekFile, async (err) => {
            if (!err) {
                const teamData = await convertCSV(weekFile, headers.teamWeekly, false, true);
                await fs.outputFile(`${teamJsonPath}${week}.js`, 'module.exports = ' + JSON.stringify(teamData));
            }
        });
    } 
};

/**
 * @function convertCSV
 * @param {string} csvFile - path to csv file to convert
 * @param {array} header - array of new header for api 
 * @param {boolean} removeExtraHeading - some csv files have 2 headers, noheader property removes first, this will remove second
 * @param {boolean} noHeader - noheader property removes header, some files (weekly) don't have header
 * @description converts csv files into json objects, returns object
 */
async function convertCSV(csvFile, header, removeExtraHeading = true, noHeader = false) {
    await console.log(csvFile);
    const obj = await csvtojson({
        noheader: noHeader,
        headers: header
    })
    .fromFile(csvFile)
    .then((jsonObj) => {
        console.log('resolved');
        //remove original header
        if (removeExtraHeading) {
            jsonObj.shift();
        }
        //console.log(playerData);
        return jsonObj;
        console.log(err)
    }, onError);

    console.log(obj);
    return obj;
} 

async function init() {
    console.log(globals.years);
    for (let i = 0; i < globals.years.length; i++) {
        const year = globals.years[i];
        await allTeam(year);
        
        globals.teams.forEach(async (team) => {
            await initTeam(team, year);
        }, year);
    }
}
init();
