const mongoQueries = require('../../scripts/mongoQueries');
//const mongodbClient = require('../../mongoClient');


// mongodbClient.createConnection(async () => {
//     db = mongodbClient.getDb();
//     const test = await init(db);
//     await console.log('test: ', test);
// });

module.exports = async function init(db) {
    const qbRequests = await mongoQueries.getAllFullTeam(db);
    console.log(qbRequests.length);
    const passingData = await Promise.all(qbRequests).then((res) => {
        let passingData = [],
            rushingData = [],
            mostPassingYards = {
                title: 'Passing Yards Leader',
                name: '',
                value: 0
            },
            mostPassingTds = {
                title: 'Passing Touchdowns Leader',
                name: '',
                value: 0
            },
            mostInts = {
                title: 'Interceptions Leader',
                name: '',
                value: 0
            },
            mostRushingTds = {
                title: 'Rushing Touchdowns Leader',
                name: '',
                value: 0
            };
        res.forEach(result => {
            if (result[0].passing) {
                result[0].passing.forEach(passer => {
                    if (passer.playerName !== 'Opp Total' && passer.playerName !== 'Team Total') {
                        if (passer.position.toLowerCase() === 'qb' || passer.position === '') {
                            passingData.push({
                                //id: parseInt(passer.number, 10),
                                name: passer.playerName,
                                passingYards: passer.yards,
                                passingTDs: passer.tds,
                                completionPercentage: passer.completionPercentage,
                                interceptions: passer.interceptions,
                                //set default rushing data
                                rushYards: 0,
                                rushTDs: 0
                            });
                            if (parseInt(passer.yards, 10) > mostPassingYards.value) {
                                mostPassingYards.name = passer.playerName;
                                mostPassingYards.value = parseInt(passer.yards, 10);
                            }
                            if (parseInt(passer.tds, 10) > mostPassingTds.value) {
                                mostPassingTds.name = passer.playerName;
                                mostPassingTds.value = parseInt(passer.tds, 10);
                            }
                            if (parseInt(passer.interceptions, 10) > mostInts.value) {
                                mostInts.name = passer.playerName;
                                mostInts.value = parseInt(passer.interceptions, 10);
                            }
                        }
                    }
                });
            }
            //get rushing data for qbs
            if (result[0].rushRec) {
                result[0].rushRec.forEach(passer => {
                    if (passer.playerName !== 'Opp Total' && passer.playerName !== 'Team Total') {
                        if (passer.position.toLowerCase() === 'qb') {
                            //console.log(passer);
                            rushingData.push({
                                //id: parseInt(passer.number, 10),
                                name: passer.playerName,
                                rushYards: passer.rushYards,
                                rushTDs: passer.rushTD
                            });
                            if (parseInt(passer.rushTD, 10) > mostRushingTds.value) {
                                mostRushingTds.name = passer.playerName;
                                mostRushingTds.value = parseInt(passer.rushTD, 10);
                            }
                        }
                    }
                });
            }
        });
        passingData.forEach(passingObj => {
            rushingData.forEach(rushingObj => {
                if (passingObj.name === rushingObj.name) {
                    passingObj.rushYards = rushingObj.rushYards;
                    passingObj.rushTDs = rushingObj.rushTDs;
                }
            });
        });
        return {
            dataTable: passingData,
            mostPassingYards: mostPassingYards,
            mostPassingTds: mostPassingTds,
            mostInts: mostInts,
            mostRushingTds: mostRushingTds
        };
        //console.log(passingData);
    });
    return passingData;
}
