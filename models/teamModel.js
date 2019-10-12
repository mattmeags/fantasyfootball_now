const jsonQuery = require('json-query');
const globals = require('./global');
const rootPath = '../data_files/json/';
const extension = '.js';

class TeamModel {
    constructor(team) {
        const teamName  = team.replace(team.charAt(0), team.charAt(0).toUpperCase());
        console.log(teamName);
        const teamIndex = globals.teams.indexOf(teamName);
        const fullTeam = globals.fullTeams[teamIndex];
        const offense = require(rootPath + 'all/offense' + extension);
        const rushOffense = require(rootPath + 'all/rushOffense' + extension);
        const passOffense = require(rootPath + 'all/passOffense' + extension);

        const offenseData = offense[offense.findIndex(i => i.name == fullTeam)];
        const rushOffenseData = rushOffense[rushOffense.findIndex(i => i.name == fullTeam)];
        const passOffenseData = passOffense[passOffense.findIndex(i => i.name == fullTeam)];
        
        this.rushRec = require(rootPath + team + '/rushRec' + extension);
        this.passing = require(rootPath + team + '/passing' + extension);
        this.offense = offenseData;
        this.rushOffense = rushOffenseData;
        this.passOffense = passOffenseData;
    };
}


module.exports = {
    init: function(team) {
        return new TeamModel(team);
    }
}
