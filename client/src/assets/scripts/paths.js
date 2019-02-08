//Common JS module for api url paths
'use strict';

const baseUrl = 'http://localhost:4000/';

module.exports = {
    loadAllTeamsUrl : baseUrl + 'getTeams',
    loadSingleTeamUrl : baseUrl + "loadTeam",
};