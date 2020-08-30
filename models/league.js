'use strict';

const mongoQueries = require('../scripts/mongoQueries'),
    BarData = require('./data/barData'),
    globals = require('./global'),
    utilities = require('../scripts/utilities');

function LeagueModel(offenseData, defenseData) {
    const fullTeams = utilities.getFullTeams(),
        teams = globals.teams;
    let namesOOrder = [],
        namesDOrder =[],
        rushAttemptsRaw = [],
        passAttemptsRaw = [],
        yardsRaw = [],
        passYardsRaw = [],
        rushYardsRaw = [],
        passYardsAgainstRaw = [],
        rushYardsAgainstRaw = [],
        mascotsOOrdered = [],
        mascotsDOrdered = [];
    
    offenseData.forEach(team => {
        if (team.name !== 'Avg Team' && team.name !== 'League Total' && team.name !== 'Avg Tm/G') {
            namesOOrder.push(team.name);
            rushAttemptsRaw.push(team.passAttempts);
            passAttemptsRaw.push(team.rushAttempts);
            yardsRaw.push(team.totalYards);
            passYardsRaw.push(team.passYards)
            rushYardsRaw.push(team.rushYrds)
        } 
    });

    defenseData.forEach(team => {
        if (team.name !== 'Avg Team' && team.name !== 'League Total' && team.name !== 'Avg Tm/G') {
            namesDOrder.push(team.name);
            rushYardsAgainstRaw.push(team.rushingYardsAgainst);
            passYardsAgainstRaw.push(team.passingYardsAgainst);
        }
    });

    mascotsOOrdered = utilities.reorderArray(namesOOrder, fullTeams, teams);
    mascotsDOrdered = utilities.reorderArray(namesDOrder, fullTeams, teams);
    console.log(mascotsOOrdered);
    this.rushAttempts = new BarData(mascotsOOrdered, rushAttemptsRaw);
    this.passAttempts = new BarData(mascotsOOrdered, passAttemptsRaw);
    this.yards = new BarData(mascotsOOrdered, yardsRaw);
    this.rushYards = new BarData(mascotsOOrdered, rushYardsRaw);
    this.passYards = new BarData(mascotsOOrdered, passYardsRaw);
    this.passYardsAgainst = new BarData(mascotsDOrdered, passYardsAgainstRaw);
    this.rushYardsAgainst = new BarData(mascotsDOrdered, rushYardsAgainstRaw);
    this.mascots = teams;
    this.defenseColorsOrdered = utilities.reorderArray(this.passYardsAgainst.labels, teams, globals.colors);
    this.offenseColorsOrdered = utilities.reorderArray(this.passYards.labels, teams, globals.colors);
    console.log(this.defenseColorsOrdered);
}

module.exports = async function(db, year) {
    console.log(db);
    const offenseData = await mongoQueries.getLeagueOffense(db, year),
        defenseData = await mongoQueries.getAllDefense(db, year),
        LeaguePromise = await Promise.all([offenseData, defenseData]).then(res => {
            const [offenseData, defenseData] = res;
            return new LeagueModel(offenseData, defenseData);
        });  
    
    return LeaguePromise;
}