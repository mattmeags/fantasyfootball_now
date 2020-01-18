const mongoClient = require('../mongoClient');
const globals = require('./global');

async function getAvgRushAgainst() {
    const db = await mongoClient.getDb(); 
    const allData = await db.collection('allDefense').find({'name': 'Avg Team'}).toArray();
    return allData[0].rushingYardsAgainst;
}

async function getAvgPassAgainst() {
    const db = await mongoClient.getDb(); 
    const allData = await db.collection('allDefense').find({'name': 'Avg Team'}).toArray();
    return allData[0].passingYardsAgainst;
}

module.exports = {
    getAvgRushAgainst: getAvgRushAgainst,
    getAvgPassAgainst: getAvgPassAgainst
};