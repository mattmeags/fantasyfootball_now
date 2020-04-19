const GLOBALS = require('../models/global');

function getFullTeamNameFromMascot (mascot) {
    const fullTeams = getFullTeams();
    const fullTeamName = fullTeams[GLOBALS.teams.indexOf(mascot)];
    return fullTeamName;
}

function getCodeFromName(name) {
    return GLOBALS.teamCodes[GLOBALS.teams.indexOf(name)];
}
function getNameFromCode(code) {
    return GLOBALS.teams[GLOBALS.teamCodes.indexOf(code)];
}
function getFullTeams() {
    let fullTeamsArr = [];
    GLOBALS.teams.forEach((team, index) => {
        fullTeamsArr.push(GLOBALS.cities[index] + ' ' + team);
    });
    return fullTeamsArr;
}
function arrayUnique(array) {
    if (array.length) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    } else {
        return array;
    }
}
module.exports = {
    getFullTeamNameFromMascot,
    getCodeFromName,
    getNameFromCode,
    getFullTeams,
    arrayUnique
}