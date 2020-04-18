const mongoQueries = require('../../scripts/mongoQueries');

module.exports = async function(db) {
    const rbRequests = await mongoQueries.getAllFullTeam(db, '2019');
    const rbData = await Promise.all(rbRequests).then(res => {
    let rbDataTable = [],
        mostTouches = {
            title: 'Touches Leader',
            name: '',
            value: 0
        },
        mostReceptions = {
            title: "Receptions Leader",
            name: '',
            value: 0
        },
        mostYards = {
            title: "Rushing Yards Leader",
            name: '',
            value: 0
        },
        mostTds = {
            title: 'Rushing Touchdowns Leader',
            name: '',
            value: 0
        };
        console.log(res);  
        res.forEach(result => {
            if (result[0].rushRec) {
                result[0].rushRec.forEach(player => {
                    if (player.playerName !== 'Opp Total' && player.playerName !== 'Team Total') {
                        if (player.position.toLowerCase() === 'rb') {
                            rbDataTable.push({
                                name: player.playerName,
                                attempts: player.rushingAttempts,
                                rushYards: player.rushYards,
                                rushTD: player.rushTD,
                                receptions: player.receptions,
                                recYards: player.recYards,
                                recTD: player.recTD,
                                fumbles: player.fumbles
                            });
                            if (parseInt(player.receptions, 10) > mostReceptions.value) {
                                mostReceptions.name = player.playerName;
                                mostReceptions.value = parseInt(player.receptions, 10);
                            }
                            if (parseInt(player.rushingAttempts, 10) > mostTouches.value) {
                                mostTouches.name = player.playerName;
                                mostTouches.value = parseInt(player.rushingAttempts, 10);
                            }
                            if (parseInt(player.rushYards, 10) > mostYards.value) {
                                mostYards.name = player.playerName;
                                mostYards.value = parseInt(player.rushYards, 10);
                            }
                            if (parseInt(player.rushTD, 10) > mostTds.value) {
                                mostTds.name = player.playerName;
                                mostTds.value = parseInt(player.rushTD, 10);
                            }
                        }
                    }
                });
            }
        });
        return {
            dataTable: rbDataTable,
            mostReceptions: mostReceptions,
            mostTouches: mostTouches,
            mostYards: mostYards,
            mostTds: mostTds
        };
    });
    return rbData;
}