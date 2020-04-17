const mongoClient = require('../mongoClient');
const globals = require('../models/global');
const fs = require('fs');

function init(callback) {
    mongoClient.createConnection(callback);
}

async function addCollections() {
    try {
        const db = await mongoClient.getDb();
        const allCollectionPromises = [];
        let allCollection = {};
        let teamData = {};

        //Create structure of league wide data
        for (let year of globals.years) {
            console.log(year);
            const defense = require(`../${globals.jsonPath}all/${year}/defense`);
            const offense = require(`../${globals.jsonPath}all/${year}/offense`);
            const passDefense = require(`../${globals.jsonPath}all/${year}/passDefense`);
            const rushDefense = require(`../${globals.jsonPath}all/${year}/rushDefense`);
            const rushOffense = require(`../${globals.jsonPath}all/${year}/rushOffense`);
            const passOffense = require(`../${globals.jsonPath}all/${year}/passOffense`);
            let allData = {
                allDefense: defense,
                allOffense: offense,
                allPassDefense: passDefense,
                allRushDefense: rushDefense,
                allRushOffense: rushOffense,
                allPassOffense: passOffense
            };
            allCollection[year] = allData;
        }

        //Create structure of team specific data
        for (let team of globals.teams) {
            console.log(team);
            teamData[team] = {};
            for (const year of globals.years) {
                const teamRushRecCollection = require(`../${globals.jsonPath}${team}/${year}/rushRec`),
                    teamPassCollection = require(`../${globals.jsonPath}${team}/${year}/passing`);
                console.log(year);
                teamData[team][year] = {
                    rushRec: teamRushRecCollection,
                    passing: teamPassCollection
                }

                for (const week of globals.weekCodes) {
                    const weekFile = `${globals.jsonPath}${team}/${year}/${week}.js`;

                    console.log(week);
                    if (fs.existsSync(weekFile)) {
                        console.log(fs.existsSync(weekFile));
                        const weekCollection = require(`../${weekFile}`);
                        if (!weekCollection) {
                            console.log(weekCollection);
                        }
                        teamData[team][year][week] = weekCollection;
                    }
                }
            }
        }

        allCollectionPromises.push(
            new Promise(function (resolve, reject) {
                new Promise(async function (resolve, reject) {
                    ///console.log('key: ', key);
                    await db.collection('all').drop();
                    await resolve();
                }).then(() => {
                    db.collection('all').insertOne(allCollection, function (err, res) {
                        if (err) {
                            throw (err);
                        }
                        resolve(res);
                    });
                });
            })
        );

        const teamCollectionPromises = await Object.keys(teamData).map((key) => {
            return new Promise(function (resolve, reject) {
                new Promise(async function (resolve, reject) {
                    console.log('bout to drop team');
                    console.log('key: ', key);
                    await db.collection(key).drop();
                    await resolve();
                }).then(() => {
                    //console.log(teamData);
                    console.log('key: ', key);
                    db.collection(key).insertOne(teamData[key], function (err, res) {
                        if (err) {
                            console.log('error here');
                            throw (err);
                        }
                        resolve(res);
                    });
                });      
            });
        });

        await console.log(teamCollectionPromises);
        await console.log('===============================================');
        let collectionPromises = await allCollectionPromises.concat(teamCollectionPromises);

        await Promise.all(collectionPromises).then(() => {
            console.log('done');
            mongoClient.closeConnection();
        });
        console.log(teamData);
    } catch (e) {
        console.log(e);
    }
}

init(addCollections);