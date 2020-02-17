// Common JS module for api url paths

const baseUrl = 'http://localhost:4000/';

export default {
  loadAllTeamsUrl: `${baseUrl}getTeams`,
  loadSingleTeamUrl: `${baseUrl}loadTeam`,
  loadPositinsUrl: `${baseUrl}getPositions`,
  loadPositionsPageUrl: `${baseUrl}loadPositions`,
  createUrl: (endPoint) => baseUrl + endPoint,
};
