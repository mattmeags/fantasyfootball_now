const mongoClient = require('../mongoClient');
const globals = require('./global');


async function getAvgRushAgainst() {
    let total = 0;
    const db = await mongoClient.getDb(); 
    const allData = await db.collection('all').find({}).toArray();  
    await allData[0].defense.forEach(element => {
        total = total + parseInt(element.rushingYardsAgainst, 10);
    });
    await console.log(total)
    const avg = await total / globals.amountOfTeams
    return avg;
}

module.exports = {
    getAvgRushAgainst: getAvgRushAgainst
};