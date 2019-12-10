const jsonQuery = require('json-query');
const globals = require('./global');
const rootPath = '../data_files/json/';
const extension = '.js';


function TeamModel (team, teamData) {
    this.teamName = team;
    //TODO: leave these for now while in dev but may not need all of them in long run
    this.rushRec = teamData.rushRec;
    this.passing = teamData.passing;
    this.teamDefense = teamData.defense;
    this.teamOffense = teamData.offense;
    this.teamPassOffense = teamData.passOffense;
    this.teamRushOffense = teamData.rushOffense;
    this.teamPassDefense = teamData.passDefense;
    this.teamRushDefense = teamData.rushDefense;
    // const playSplitData = {
    //     labels: [
    //         'Passing Plays', 'Rushing Plays'
    //     ],
    //     series: [
    //         this.offense.passAttempts, this.offense.rushAttempts
    //     ]
    // };
    const receivingCompareSeries = {
        seriesValue1: 'recTargets',
        seriesValue2: 'receptions'
    }
    const tdStackedSeries = [
        {
            seriesName: 'rushTD',
            seriesObject: {name: 'Rushing Touchdown', data: []}
        },
        {
            seriesName: 'recTD',
            seriesObject: {name: 'Receiving Touchdown', data: []}
        }
    ]
    this.rushingSplitData = getRushSplit(this.rushRec);
    this.receivingTargetsData = getCompareData(receivingCompareSeries, this.rushRec);
    this.tdData = getStackedData(tdStackedSeries, this.rushRec);
    this.recYardsData = getColumnData('recYards', this.rushRec);
    this.rushYardsData = getColumnData('rushYards', this.rushRec);
}


/** TODO: posibily make constructor
/* @function getDonutSplit
* @params {string} position
* @desc creates chartDataObject based on position a skill
* TODO so far this works pie, see if it works for anything else;
*/
function getRushSplit(playerData) {
    console.log('getdonutsplit');
    let chartData = {
        labels: [],
        series: []
    };
    console.log(this.team);
    playerData.forEach((player) => {
        if (player.position.toLowerCase() == 'rb') {
            chartData.labels.push(player.playerName);
            chartData.series.push(player['rushingAttempts']);
        }
    });
    console.log(chartData);
    return chartData;

}

function getCompareData(seriesValues, playerData) {
    let chartData = {
        labels: [],
        series: [{data: []}, {data: []}]
    };

    playerData.forEach((player) => {
        // if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
        if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                return false;
        }

        if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
            return false;
        }
        chartData.labels.push(player.playerName);
        chartData.series[0].data.push(player[seriesValues.seriesValue1]);
        chartData.series[1].data.push(player[seriesValues.seriesValue2]);
        //}
    });

    return chartData;
}

function getStackedData(seriesValues, playerData) {
    // empty data
    seriesValues.forEach(element => {
        element.seriesObject.data = [];
    });

    let chartData = {
        labels: [],
        series: []
    }

    playerData.forEach((player) => {
        //if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
            if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                    return false;
            }
            // if any of the values are greater than 0 push all values required
            seriesValues.forEach(element => {
                if (player[element.seriesName] > 0) {
                    chartData.labels.push(player.playerName);
                    seriesValues.forEach(element2 => {
                        element2.seriesObject.data.push(player[element2.seriesName]);
                    });
                    return;
                }
            });
        //}
    });

    seriesValues.forEach(element => {
        chartData.series.push(element.seriesObject);
    });

    return chartData
}

function getColumnData(seriesKey, playerData) {
    let chartData = {
        labels: [],
        series: [{name: seriesKey, data: []}]
    }

    playerData.forEach(player => {
        //if (filter === 'all' || filter === player.position.toLowerCase().slice(0, 2)) {
            if (player.playerName === 'Team Total' || player.playerName == 'Opp Total') {
                    return false;
            }

            if (player[seriesKey] > 0) {
                chartData.labels.push(player.playerName);
                chartData.series[0].data.push(player[seriesKey]);
            }
        //}
    });

    return chartData;
}

async function init(team, db) {
    const teamName  = team.replace(team.charAt(0), team.charAt(0).toLowerCase());
    const fullTeamName = globals.fullTeams[globals.teams.indexOf(teamName)];
    const rushRechData = await db.collection(teamName).find({}).toArray();
    const wholeTeamData = await db.collection('all').find({'name': fullTeamName}).toArray();
    const fullTeamData = await Object.assign(rushRechData[0], wholeTeamData[0]);
    
    return new TeamModel(fullTeamName, fullTeamData);
}

module.exports = init;
