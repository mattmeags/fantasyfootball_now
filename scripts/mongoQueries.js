const globals = require('../models/global');

module.exports = {
    getFullTeam: async (team, year, db) => {
        const rushRecData = await db.collection(team).find({year: year}).toArray();
        return rushRecData;
    },
    getAllFullTeam: (db, year) => {
        const allTeamPromises = globals.teams.map(team => {
            return new Promise(function(resolve, reject) {
                console.log('year: ', year);
                resolve(db.collection(team).find({year: year}).toArray());
            }, year);
        });
        return allTeamPromises;
    },
    getLeague: async (db, year) => {
        //TODO all should be a constant
        const leagueData = await db.collection('all').find({year: year}).toArray();
        return leagueData[0];
    },
    getAllDefense: async (db) => {
        const allDefensePromises = await db.collection('allDefense').find({}).toArray();
        return allDefensePromises;
    },
    getAvgRushAgainst: async (db, year) => {
        const allData = await db.collection('allDefense').find({$and: [{'name': 'Avg Team'}, {'year': year}]}).toArray();
        return allData[0].rushingYardsAgainst;
    },
    getAvgPassAgainst: async (db, year) => {
        const allData = await db.collection('allDefense').find({$and: [{'name': 'Avg Team'}, {'year': year}]}).toArray();
        return allData[0].passingYardsAgainst;
    }
}