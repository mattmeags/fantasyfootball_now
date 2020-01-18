const globals = require('../models/global');

module.exports = {
    getFullTeam: async (team, db) => {
        const rushRecData = await db.collection(team).find({}).toArray();
        return rushRecData;
    },
    getAllFullTeam: (db) => {
        const allTeamPromises = globals.teams.map(team => {
            return new Promise(function(resolve, reject) {
                resolve(db.collection(team).find({}).toArray());
            });
        });
        return allTeamPromises;
    }
}