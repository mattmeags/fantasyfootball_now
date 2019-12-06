const jsonQuery = require('json-query');
const globals = require('./global');
const rootPath = '../data_files/json/';
const extension = '.js';


function TeamModel (team, teamData) {
    this.teamName = team;
    this.rushRec = teamData.rushRec;
    this.passing = teamData.passing;
    this.teamDefense = teamData.defense;
    this.teamOffense = teamData.offense;
    this.teamPassOffense = teamData.passOffense;
    this.teamRushOffense = teamData.rushOffense;
    this.teamPassDefense = teamData.passDefense;
    this.teamRushDefense = teamData.rushDefense;
}

async function init(team, db) {
    const teamName  = team.replace(team.charAt(0), team.charAt(0).toLowerCase());
    const fullTeamName = globals.fullTeams[globals.teams.indexOf(teamName)];
    const rushRechData = await db.collection(teamName).find({}).toArray();
    const wholeTeamData = await db.collection('all').find({'name': fullTeamName}).toArray();
    const fullTeamData = await Object.assign(rushRechData[0], wholeTeamData[0]);
    return new TeamModel(fullTeamName, fullTeamData);
}

module.exports = init;
