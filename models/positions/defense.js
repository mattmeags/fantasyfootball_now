const mongoQueries = require('../../scripts/mongoQueries');
const mongodbClient = require('../../mongoClient');

async function init(db) {
    let defenseTable = [],
        // sacksLeader = {
        //     title: 'Sacks Leader',
        //     name: '',
        //     value: 0
        // },
        interceptionLeader = {
            title: 'Interceptions Leader',
            name: '',
            value: 0
        },
        leastYardsAgainst = {
            title: 'Least Yards Against',
            name: '',
            value: 0,
        },
        leastRushingYardsAgainst = {
            title: 'Least Rushing Yards Against',
            name: '',
            value: 0
        },
        leastPassingYardsAgainst = {
            title: 'Least Passing Yards Against',
            name: '',
            value: 0
        };
        //TODO: need to account sacks
    const dbRequest = await mongoQueries.getAllDefense(db);
    if (dbRequest) {
        await dbRequest.forEach((team, index) => {
            if (team.name !== 'Avg Team' && team.name !== 'League Total' && team.name !== 'Avg Tm/G') {
                defenseTable.push({
                    name: team.name,
                    pointsAgainst: team.pointsScoredAgainst,
                    yardsAgaint: team.yardsAgainst,
                    passingYardsAgainst: team.passingYardsAgainst,
                    passingTDsAgainst: team.passingTDsAgainst,
                    intereceptions: team.interceptions,
                    rushYardsAgainst: team.rushingYardsAgainst,
                    rushTDsAgainst: team.rushingTDsAgainst
                });
                if (parseInt(team.interceptions, 10) > interceptionLeader.value) {
                    interceptionLeader.name = team.name;
                    interceptionLeader.value = parseInt(team.interceptions, 10);
                }
                if (index === 0) {
                    leastYardsAgainst.name = team.name;
                    leastYardsAgainst.value = parseInt(team.yardsAgainst, 10);
                    leastPassingYardsAgainst.name = team.name;
                    leastPassingYardsAgainst.value = parseInt(team.passingYardsAgainst, 10);
                    leastRushingYardsAgainst.name = team.name;
                    leastRushingYardsAgainst.value = parseInt(team.rushingYardsAgainst, 10);
                } else  {
                    if (parseInt(team.yardsAgainst, 10) < leastYardsAgainst.value) {
                        leastYardsAgainst.name = team.name;
                        leastYardsAgainst.value = parseInt(team.yardsAgainst, 10);
                    }
                    if (parseInt(team.passingYardsAgainst, 10) < leastPassingYardsAgainst.value) {
                        leastPassingYardsAgainst.name = team.name;
                        leastPassingYardsAgainst.value = parseInt(team.passingYardsAgainst, 10);
                    }
                    if (parseInt(team.rushingYardsAgainst, 10) < leastRushingYardsAgainst.value) {
                        leastRushingYardsAgainst.name = team.name;
                        leastRushingYardsAgainst.value = parseInt(team.rushingYardsAgainst, 10);
                    }
                }
               
            }
        });
    }
    return {
        dataTable: defenseTable,
        interceptionLeader: interceptionLeader,
        leastYardsAgainst: leastYardsAgainst,
        leastRushingYardsAgainst: leastRushingYardsAgainst,
        leastPassingYardsAgainst: leastPassingYardsAgainst
    }
}

module.exports = init;