const globals = require('./global');
const averages = require('./averages');

function TeamModel (team, teamData, avgs) {
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
    this.receivingTargetsData = getGroupedColumnData(receivingCompareSeries, this.rushRec);
    this.tdData = getStackedColumnData(tdStackedSeries, this.rushRec);
    this.recYardsData = getColumnPlayerData('recYards', this.rushRec);
    this.rushYardsData = getColumnPlayerData('rushYards', this.rushRec);
    this.totalRushYardsAgainstData = new BarData(['Rushing Yards Against', 'Average Rushing Yards Against'], [this.teamDefense.rushingYardsAgainst, avgs.rushAgainst], true);
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

function getGroupedColumnData(seriesValues, playerData) {
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

function getStackedColumnData(seriesValues, playerData) {
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

function getColumnPlayerData(seriesKey, playerData, horizontal = false) {
    let chartData = {
        labels: [],
        series: [{name: seriesKey, data: []}],
        isHorizontal: horizontal
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

function BarData(labels, data, horizontal) {
    this.labels = labels;
    this.series = data;
    this.isHorizontal = horizontal;
}

async function init(team, db) {
    
    //const teamName  = team.replace(team.charAt(0), team.charAt(0).toLowerCase());
    const fullTeamName = globals.fullTeams[globals.teams.indexOf(team)];
    const rushRecData = await db.collection(team).find({}).toArray();
    console.log(fullTeamName);
    const wholeTeamData = await db.collection('all').find({
        defense: {'name': fullTeamName}
    }).toArray();
    // await wholeTeamData.forEach(element => {

    // });
    console.log(wholeTeamData);
    const fullTeamData = await Object.assign(rushRecData[0], wholeTeamData[0]);
    const avgs = {
        rushAgainst: await averages.getAvgRushAgainst()
    }
    return new TeamModel(fullTeamName, fullTeamData, avgs);
}

module.exports = init;
