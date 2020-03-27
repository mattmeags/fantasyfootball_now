const mongoQueries = require('../../scripts/mongoQueries');
const mongodbClient = require('../../mongoClient');


//module.exports = 
async function init() {
    let db;

    await mongodbClient.createConnection(() => {
        console.log('boom');
        db = mongodbClient.getDb();
    });
    await console.log(db);
    // const dRequest = await mongoQueries.getAllDefense(db);

    // const defenseData = await new Promise(dRequest).then(res => {
    //     console.log(res);
    // });
}

init();