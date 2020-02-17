//TODO: make this a class??

const averages = require('./averages');
const utilites = require('../scripts/utilities');
const getGroupedColumnData = require('./data/groupColData');
const getStackedColumnData = require('./data/stackedColData');
const mongoQueries = require('../scripts/mongoQueries');
const getColumnPlayerData = require('./data/getColumnPlayerData');

function TeamModel (team, teamData, avgs, color) {
    this.teamName = team;
    //TODO: leave these for now while in dev but may not need all of them in long run
    this.rushRec = teamData.rushRec;
    this.passing = teamData.passing;
    this.teamDefense = teamData.defense;
    //this.teamOffense = teamData.offense;
    this.teamPassOffense = teamData.passOffense;
    this.teamRushOffense = teamData.rushOffense;
    //this.teamPassDefense = teamData.passDefense;
    //this.teamRushDefense = teamData.rushDefense;
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
    this.receivingTargetsData = getGroupedColumnData(receivingCompareSeries, this.rushRec, 'all');
    this.tdData = getStackedColumnData(tdStackedSeries, this.rushRec, 'all');
    this.recYardsData = getColumnPlayerData('recYards', this.rushRec, 'all');
    this.rushYardsData = getColumnPlayerData('rushYards', this.rushRec, 'all');
    this.totalRushYardsAgainstData = new BarData(['Rushing Yards Against', 'League Total Average Rushing Yards Against'], [parseInt(this.teamDefense.rushingYardsAgainst, 10), avgs.rushAgainst], true);
    this.totalPassYardsAgainstData = new BarData(['Passing Yards Against', 'League Total Average Passing Yards Against'], [parseInt(this.teamDefense.passingYardsAgainst, 10), avgs.passAgainst], true);
    this.offensePlaySplit = new BarData(['Passing Plays', 'Rushing Plays'], [parseInt(this.teamPassOffense.attempts, 10), parseInt(this.teamRushOffense.attempts, 10)], true);
    this.color = color;
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

function BarData(labels, data, horizontal) {
    this.labels = labels;
    this.series = [{data: data}];
    this.isHorizontal = horizontal;
}

async function init(team, db) {

    const fullTeamName = utilites.getFullTeamNameFromMascot(team);
    const color = utilites.getTeamColorFromMascot(team);
    const rushRecData = await mongoQueries.getFullTeam(team, db);
    const defense = await db.collection('allDefense').find({'name' : fullTeamName}).toArray();
    const passOffense = await db.collection('allPassOffense').find({'name' : fullTeamName}).toArray();
    const rushOffense = await db.collection('allRushOffense').find({'name' : fullTeamName}).toArray();
    const wholeTeamData = {
        defense: await defense[0],
        passOffense: await passOffense[0],
        rushOffense: await rushOffense[0]
    }
    const fullTeamData = await Object.assign(rushRecData[0], wholeTeamData);
    console.log(fullTeamData.defense);
    const avgs = {
        rushAgainst: await averages.getAvgRushAgainst(),
        passAgainst: await averages.getAvgPassAgainst()
    }
    return new TeamModel(fullTeamName, fullTeamData, avgs, color);
}

module.exports = init;
