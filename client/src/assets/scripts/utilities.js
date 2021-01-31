//TODO: Need lots of comments
/**
 * @param {array} strings
 * @description converts array of strings into array of integers
*/
export function convertStringsToInts(strings) {
    const integers = strings.map(string => parseInt(string, 10));
    return integers;
};

/**
 * @param {array} strings
 * @description trims the PFR notations off names
*/
export function trimNames (names) {
    const namesFix = names.map(name => {
        return trimName(name);
    });
    return namesFix;
};

/**
 * 
 * @param {*} name 
 */
export function trimName(name) {
    let finalName;
    if (name.indexOf('\\') != -1) {
        finalName = name.substring(0, name.indexOf('\\'));
    } else {
        finalName = name;
    }
    if (finalName.indexOf('*') != -1) {
        finalName = name.substring(0, name.indexOf('*'));
    }
    if (finalName.indexOf('+') != -1) {
        finalName = name.substring(0, name.indexOf('+'));
    }
    return finalName;
};
// this can be a mixin
export function getColors(teamColor) {
    const Color = require('color');

    let dataColors = [];
    dataColors.push(teamColor);
    for (var i = 0; i < 5; i++) {
        dataColors.push(Color(dataColors[i]).darken(0.3).hex());
    }
    return dataColors;
}
//TODO: add to constants
const baseUrl = 'http://localhost:4000/';
export const paths = {
    loadAllTeamsUrl: `${baseUrl}getTeams`,
    loadSingleTeamUrl: `${baseUrl}loadTeam`,
    loadPositinsUrl: `${baseUrl}getPositions`,
    loadPositionsPageUrl: `${baseUrl}loadPositions`,
    getYears: `${baseUrl}getYears`,
    updateYear: `${baseUrl}updateYear`,
    home: `${baseUrl}home`,
    createUrl: (endPoint) => baseUrl + endPoint,
}

/**
 * 
 * @param {*} dataSet 
 * @param {*} colors 
 */
export function addColorToDataSet(dataSet, colors) {
    dataSet.forEach((dataSet, index) => {
        dataSet.backgroundColor = colors[index];
    });
    return dataSet;
}


/**
 * 
 * @param {*} array1 
 * @param {*} array2 
 */
export function sumArrays(array1, array2) {
    let sumsArray = []
    array1.forEach((element, index) => {
        let arr1Num,
            arr2Num;
        //CHeck of empty strings as values
        if (element == "") {
            arr1Num = 0;
        } else {
            arr1Num = parseInt(element, 10);
        }
        if (array2[index] == "") {
            arr2Num = 0;
        } else {
            arr2Num = parseInt(array2[index], 10);
        }

        let sum = arr1Num + arr2Num;
        sumsArray.push(sum);
    });
    return sumsArray;
}

