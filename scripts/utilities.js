const GLOBALS = require('../models/global');
module.exports = {
    getFullTeamNameFromMascot: (mascot) => {
        const fullTeams = getFullTeams();
        const fullTeamName = fullTeams[GLOBALS.teams.indexOf(mascot)];
        return fullTeamName;
    },
    getCodeFromName: (name) => {
        // const index = GLOBALS.teams.findIndex((el) => el === name),
        //     code = GLOBALS.teamCodes[index];
        // return code;
        return GLOBALS.teamCodes[GLOBALS.teams.indexOf(name)];
    },
    getNameFromCode: (code) => {
        return GLOBALS.teams[GLOBALS.teamCodes.indexOf(code)];
    },
    getFullTeams: () => {
        let fullTeamsArr = [];
        GLOBALS.teams.forEach((team, index) => {
            fullTeamsArr.push(GLOBALS.cities[index] + ' ' + team);
        });
        return fullTeamsArr;
    },
    arrayUnique: function (array) {
        console.log(array.length);
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
    
}