//TODO: make this a class??

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
    // this.recevingCompareLabels = ['Targets', 'Receptions'];
    this.receivingCompareSeries = {
        seriesValue1: 'recTargets',
        seriesValue2: 'receptions',
        seriesName1: 'Targets',
        seriesName2: 'Receptions'
    };
    this.tdStackedSeries = [
        {
            seriesName: 'rushTD',
            seriesObject: {label: 'Rushing Touchdown', data: []}
        },
        {
            seriesName: 'recTD',
            seriesObject: {label: 'Receiving Touchdown', data: []}
        }
    ]
    this.rushingSplitData = getRushSplit(this.rushRec);
    this.receivingTargetsData = getGroupedColumnData(this.receivingCompareSeries, this.rushRec, 'all');
    console.log('here: ', this.receivingTargetsData);
    this.tdData = getStackedColumnData(this.tdStackedSeries, this.rushRec, 'all');
    this.recYardsData = getColumnPlayerData('recYards', this.rushRec, 'all');
    this.rushYardsData = getColumnPlayerData('rushYards', this.rushRec, 'all');
    this.totalRushYardsAgainstData = new BarData(['Rushing Yards Against', 'League Average'], [parseInt(this.teamDefense.rushingYardsAgainst, 10), avgs.rushAgainst], true);
    this.totalPassYardsAgainstData = new BarData(['Passing Yards Against', 'League Average'], [parseInt(this.teamDefense.passingYardsAgainst, 10), avgs.passAgainst], true);
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
    let chartData = {
        labels: [],
        series: []
    };

    playerData.forEach((player) => {
        const playerPosition = player.position.toLowerCase();

        if (player.playerName !== 'Team Total' && player.playerName !== 'Opp Total') {
            if ((playerPosition === 'rb' || playerPosition === 'fb') || (playerPosition === '' && player.rushingAttempts > 0)) {
                chartData.labels.push(player.playerName);
                chartData.series.push(player['rushingAttempts']);
            }
        }
        
    });
    console.log(chartData);
    return chartData;

}

function BarData(labels, data, horizontal) {
    this.labels = labels;
    this.series = data;
    this.isHorizontal = horizontal;
}

async function init(team, db, year) {
    //const year = "2019";
    const fullTeamName = utilites.getFullTeamNameFromMascot(team);
    const leagueData = await mongoQueries.getLeague(db, year);
    await console.log(leagueData);
    const rushRecData = await mongoQueries.getFullTeam(team, year, db);
    const defense = await db.collection('allDefense').find({$and: [{'name' : fullTeamName}, {'year': year}]}).toArray();
    const passOffense = await db.collection('allPassOffense').find({ $and: [{ 'name': fullTeamName }, { 'year': year }] }).toArray();
    const rushOffense = await db.collection('allRushOffense').find({ $and: [{ 'name': fullTeamName }, { 'year': year }] }).toArray();

    const wholeTeamData = {
        defense: await defense[0],
        passOffense: await passOffense[0],
        rushOffense: await rushOffense[0]
    }
    const fullTeamData = await Object.assign(rushRecData[0], wholeTeamData);
    const color = utilites.getColorFromMascot(team);
    console.log(fullTeamData.defense);
    const avgs = {
        rushAgainst: await mongoQueries.getAvgRushAgainst(db, year),
        passAgainst: await mongoQueries.getAvgPassAgainst(db, year)
    }
    return new TeamModel(fullTeamName, fullTeamData, avgs, color);
}

module.exports = init;
