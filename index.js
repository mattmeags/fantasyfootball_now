const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan'),
      bodyParser = require('body-parser');
const mongodbClient = require('./mongoClient');
const globals = require('./models/global');
const mongoQueries = require('./scripts/mongoQueries');
const teamModel = require('./models/teamModel');
let year = globals.years.reverse()[0];

let db;

const app = express();
mongodbClient.createConnection(() => {
    db = mongodbClient.getDb();
});



//Require static data
const teams = require("./models/teams.js"); 

//express initilalizions
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('here?');
    res.json({
        message: 'Hello World'
    });
});

/**
 * @function get/getTeams
 * @description - express route returns list of teams and their divisions
 */
app.get('/getTeams', (req, res) => {
    
    const teams = require('./models/global.js').teams;
    res.json(teams);
});

/**
 * @function get/getPositions
 * @description - route returns list of positions
 */
app.get('/getPositions', (req, res) => {
    const positions = require('./models/global.js').positions;
    res.json(positions);
});

/**
 * @function post/loadTeam
 * @description - express route that loads team data for team page
 */
app.post('/loadTeam', async (req, res) => {
    const team = await teamModel(req.body.teamId, db, year);
    await res.json(team);
});

app.get('/loadPlayer', (req, res) => {
    console.log(req.body.position);
});

//TODO: can we make these one call? repeating alot of stuff
app.post('/filterGroupedColumnData', async (req, res) => {
    const getGroupedColumnData = require('./models/data/groupColData'),
        teamData = await teamModel(req.body.team, db, year),
        filteredGroupedColumnData = await getGroupedColumnData(teamData[req.body.seriesName], teamData.rushRec, req.body.filter);
    
    let result = {};
    result[req.body.updateState] = await filteredGroupedColumnData;
    await res.json(result);
});

app.post('/filterStackedColumnData', async (req, res) => {
    const getStackedColumnData = require('./models/data/stackedColData'),
        teamData = await teamModel(req.body.team, db, year),
        filteredStackedColumnData = await getStackedColumnData(teamData[req.body.seriesName], teamData.rushRec, req.body.filter);
    
    let result = {};
    result[req.body.updateState] = await filteredStackedColumnData;

    await res.json(result);
});

app.post('/filterColumnData', async (req, res) => {
    const getColumnPlayerData = require('./models/data/getColumnPlayerData'),
        teamData = await teamModel(req.body.team, db, year),
        filteredColumnData = await getColumnPlayerData(req.body.seriesName, teamData.rushRec, req.body.filter);
    
    let result = {};
    result[req.body.updateState] = await filteredColumnData;

    await res.json(result);
});

app.post('/loadPositions', async (req, res) => {
    const position = req.body.position;
    if (position === 'Running Back') {
        const RBModel = require('./models/positions/runningback');
        const rushingData = await RBModel(db, year);
        await res.json( {
            header: globals.rbTableHeader,
            position: rushingData
        });
    } else if (position === 'Quarterback') {
        const QBModel = require('./models/positions/quarterback');
        const passingData = await QBModel(db, year);
        await res.json({
           header: globals.qbTableHeader, 
           position: passingData
        });
    } else if (position === 'Wide Receiver' || position === 'Tight End') {
        const ReceivingModel = require('./models/positions/receiver');
        let receivingData;
        if (position === 'Wide Receiver') {
            receivingData = await ReceivingModel(db, 'wr', year);
        } else {
            receivingData = await ReceivingModel(db, 'te', year);
        }
        await res.json({
            header: globals.receivingTableHeader,
            position: receivingData
        });
    } else if (position === 'Defense') {
        const DefenseModel = require('./models/positions/defense');
        const defenseData = await(DefenseModel(db));
        await res.json({
            header: globals.DefenseTableHeader,
            position:  defenseData
        });
    }
    console.log(req.body.position);
});

app.get('/getYears', (req, res) => {
    res.json({
        years: globals.years
    });
});

app.post('/updateYear', (req, res) => {
    year = req.body.year;
    res.json({
        success: true
    })
});

const port = process.env.PORT || 4000;

app.listen(port, ()=> {
    console.log('listening on ' + port);
});