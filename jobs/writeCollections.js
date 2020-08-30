const mongoClient = require('../mongoClient');
const globals = require('../models/global');
const fs = require('fs');

function init(callback) {
    mongoClient.createConnection(callback);
}

async function addCollections() {
    try {
        const db = await mongoClient.getDb(),
            allCollectionPromises = [];
        // let allCollection = [];
        let teamData = {},
            allData = {
                allDefense: [],
                allOffense: [],
                allPassDefense: [],
                allRushDefense: [],
                allRushOffense: [],
                allPassOffense: []
            };

        //Create structure of league wide data
        for (let year of globals.years) {
            const defense = require(`../${globals.jsonPath}all/${year}/defense`),
                offense = require(`../${globals.jsonPath}all/${year}/offense`),
                passDefense = require(`../${globals.jsonPath}all/${year}/passDefense`),
                rushDefense = require(`../${globals.jsonPath}all/${year}/rushDefense`),
                rushOffense = require(`../${globals.jsonPath}all/${year}/rushOffense`),
                passOffense = require(`../${globals.jsonPath}all/${year}/passOffense`);

            // Add year property to each object - better for querying
            defense.forEach(obj => obj.year = year);
            offense.forEach(obj => obj.year = year);
            passDefense.forEach(obj => obj.year = year);
            rushDefense.forEach(obj => obj.year = year);
            rushOffense.forEach(obj => obj.year = year);
            passOffense.forEach(obj => obj.year = year);

            
            await allData.allDefense.push(...defense);
            await allData.allOffense.push(...offense);
            await allData.allPassDefense.push(...passDefense);
            await allData.allRushDefense.push(...rushDefense);
            await allData.allRushOffense.push(...rushOffense);
            await allData.allPassOffense.push(...passOffense);

        }

        //Create structure of team specific data
        for (let team of globals.teams) {
            //console.log(team);
            teamData[team] = [];
            for (const year of globals.years) {
                const teamRushRecCollection = require(`../${globals.jsonPath}${team}/${year}/rushRec`),
                    teamPassCollection = require(`../${globals.jsonPath}${team}/${year}/passing`);
                //console.log(year);
                let teamObj = {
                    year: year,
                    rushRec: teamRushRecCollection,
                    passing: teamPassCollection
                };

                for (const week of globals.weekCodes) {
                    const weekFile = `${globals.jsonPath}${team}/${year}/${week}.js`;

                    //console.log(week);
                    if (fs.existsSync(weekFile)) {
                        //console.log(fs.existsSync(weekFile));
                        const weekCollection = require(`../${weekFile}`);
                        if (!weekCollection) {
                            console.log(weekCollection);
                        }
                        teamObj[week] = weekCollection;
                    }
                }

                teamData[team].push(teamObj);
            }
        }
        //await console.log(allCollection);
        //console.log(Object.keys(allData));
        for (let key in allData) {
            //await console.log(key);
            await allCollectionPromises.push(
                
                new Promise(function (resolve, reject) {
                    new Promise(async function (resolve, reject) {
                        await console.log('drop key: ', key);
                        await db.collection(key).drop();
                        //await console.log('dropped');
                        await resolve();
                    }).then(() => {
                        console.log('+++++++++++++++');
                        console.log(key)
                        db.collection(key).insertMany(allData[key], function (err, res) {
                            if (err) {
                                throw (err);
                            }
                            resolve(res);
                        });
                    });
                })
            );
        }
            
        

        const teamCollectionPromises = await Object.keys(teamData).map((key) => {
            return new Promise(function (resolve, reject) {
                new Promise(async function (resolve, reject) {
                    await db.collection(key).drop();
                    await resolve();
                }).then(() => {
                    //console.log(teamData);
                   // console.log('key: ', key);
                    db.collection(key).insertMany(teamData[key], function (err, res) {
                        if (err) {
                            console.log('error here');
                            throw (err);
                        }
                        resolve(res);
                    });
                });
            });
        });

        let collectionPromises = await allCollectionPromises.concat(teamCollectionPromises);

        await Promise.all(collectionPromises).then(() => {
            console.log('done');
            mongoClient.closeConnection();
        });
        //console.log(teamData);
    } catch (e) {
        console.log(e);
    }
}

init(addCollections);