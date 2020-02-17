const globals = require('../models/global');
module.exports = {
    getFullTeamNameFromMascot: (mascot) => {
        const fullTeams = globals.fullTeams();
        const fullTeamName = fullTeams[globals.teams.indexOf(mascot)];
        return fullTeamName;
    },
    getTeamColorFromMascot: (mascot) => {
        const colors = globals.colors,
            teams = globals.teams,
            teamColor = colors[teams.indexOf(mascot)];
        
        return teamColor;
    }
}