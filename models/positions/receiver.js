const mongoQueries = require('../../scripts/mongoQueries');

async function init(db, position) {
    const receivingRequests = mongoQueries.getAllFullTeam(db);
    const receivingData = await Promise.all(receivingRequests).then(res => {
        let receivingDataTable = [],
            mostReceptions = {
                title: 'Completions Leader',
                name: '',
                value: 0
            },
            mostTargets = {
                title: 'Targets Leader',
                name: '',
                value: 0
            },
            mostYards = {
                title: 'Receiving Yards Leader',
                name: '',
                value: 0
            },
            mostTds = {
                title: 'Receiving Touchdowns Leader',
                name: '',
                value: 0
            };
        res.forEach(result => {
            if (result.length > 0 && 'rushRec' in result[0]) {
                result[0].rushRec.forEach(player => {
                    if (player.playerName !== 'Opp Total' && player.playerName !== 'Team Total') {
                        if (player.position.toLowerCase() === position) {
                            receivingDataTable.push({
                                name: player.playerName,
                                targets: player.recTargets,
                                completions: player.receptions,
                                tds: player.recTD,
                                yards: player.recYards
                            });
                            if (parseInt(player.receptions, 10) > mostReceptions.value) {
                                mostReceptions.name = player.playerName;
                                mostReceptions.value = parseInt(player.receptions, 10);
                            }
                            if (parseInt(player.recTargets, 10) > mostTargets.value) {
                                mostTargets.name = player.playerName;
                                mostTargets.value = parseInt(player.recTargets, 10);
                            }
                            if (parseInt(player.recYards, 10) > mostYards.value) {
                                mostYards.name = player.playerName;
                                mostYards.value = parseInt(player.recYards, 10);
                            }
                            if (parseInt(player.recTD, 10) > mostTds.value) {
                                mostTds.name = player.playerName;
                                mostTds.value = parseInt(player.recTD, 10);
                            }
                        }
                    }
                });
            }
        });
        return {
            dataTable: receivingDataTable,
            mostReceptions: mostReceptions,
            mostTargets: mostTargets,
            mostYards: mostYards,
            mostTds: mostTds
        };
    });
    return receivingData;
}

module.exports = init;