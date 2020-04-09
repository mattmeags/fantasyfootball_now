const mongoClient = require('../mongoClient');
const globals = require('../models/global');

function init(callback) {
    mongoClient.createConnection(callback);
}

async function addCollections() {
    const db = mongoClient.getDb();
    const defense = require(`../${globals.jsonPath}/all/defense`);
    const offense = require(`../${globals.jsonPath}/all/offense`);
    const passDefense = require(`../${globals.jsonPath}/all/passDefense`);
    const rushDefense = require(`../${globals.jsonPath}/all/rushDefense`);
    const rushOffense = require(`../${globals.jsonPath}/all/rushOffense`);
    const passOffense = require(`../${globals.jsonPath}/all/passOffense`);
    let allCollection = {
        allDefense: defense,
        allOffense: offense,
        allPassDefense: passDefense,
        allRushDefense: rushDefense,
        allRushOffense: rushOffense,
        allPassOffense: passOffense
    };
    // db.collection('all').drop();
    // db.collection('all').insertMany(allCollection, function(err, res) {
    //     if (err) {
    //         console.log('line 23');
    //         throw (err);
    //       }
    // });
    // db.collection('allDefense').insertMany(defense, function(err, res) {
    //     if (err) {
    //         throw (err);
    //     }
    // });

    let allCollectionPromises = Object.keys(allCollection).map((key) => {
        return new Promise(function(resolve, reject) {
            new Promise(function(resolve, reject) {
                db.collection(key).drop();
                resolve();
            }).then(() => {
                db.collection(key).insertMany(allCollection[key], function(err, res) {
                    if (err) {
                        throw (err);
                    }
                    resolve(res);
                });
            });
        });
    });

    let addCollectionPromises = globals.teams.map(team => {
        return new Promise(function(resolve, reject) {
            const teamRushRecCollection = require(`../${globals.jsonPath}${team}/rushRec`);
            const teamPassCollection = require(`../${globals.jsonPath}${team}/passing`);
      
            let teamCollection = [];
            teamCollection.push({
                rushRec: teamRushRecCollection,
                passing: teamPassCollection
            });
            new Promise(function(resolve, reject) {
                db.collection(team).drop();
                resolve();
            }).then(() => {
                db.collection(team).insertMany(teamCollection, function(err, res) {
                    if (err) {
                        console.log('error here');
                        throw (err);
                    }
                    resolve(res);
                });
            });
        }); 
    });

    let collectionPromises = allCollectionPromises.concat(addCollectionPromises);

    Promise.all(collectionPromises).then(() => {
        console.log('done');
        mongoClient.closeConnection();
    });
}

init(addCollections);