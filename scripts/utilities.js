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

function getColorFromMascot(mascot) {
    return GLOBALS.colors[GLOBALS.teams.indexOf(mascot)];
}

function reorderArray(baseArray, compareArray, newValuesArray = null) {
    // reorder an array and use first array to populate new array or use a third array
    //The 2 compare arrays must be the same expected order
    const reorderedArray = baseArray.map(item => {
        const index = compareArray.indexOf(item);
        let pushValue;
        if (index >= 0) {
            if (newValuesArray) {
                pushValue = newValuesArray[index];
            } else {
                pushValue = compareArray[index];
            }
        }
        return pushValue;
    });

    return reorderedArray;
}

module.exports = {
    getFullTeamNameFromMascot,
    getCodeFromName,
    getNameFromCode,
    getFullTeams,
    arrayUnique,
    getColorFromMascot,
    reorderArray
}