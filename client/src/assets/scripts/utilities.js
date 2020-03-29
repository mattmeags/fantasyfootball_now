/**
 * @function convertStringToInt
 * @param {array} strings
 * @description converts array of strings into array of integers
*/
export function convertStringToInt(strings) {
    const integers = strings.map(string => parseInt(string, 10));
    return integers;
};
/**
 * @function trimNames
 * @param {array} strings
 * @description trims the PFR notations off names
*/
export function trimNames (names) {
    console.log('trimNames')
    console.log(names);
    const namesFix = names.map(name => {
        return trimName(name);
    });
    console.log(namesFix);
    return namesFix;
};
export function trimName(name) {
    let finalName;
    if (name.indexOf('\\') != -1) {
        finalName = name.substring(0, name.indexOf('\\'));
    } else {
        finalName = name;
    }
    if (finalName.indexOf('*') != -1) {
        console.log(finalName)
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
  
