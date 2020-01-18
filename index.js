const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan'),
      bodyParser = require('body-parser');
const mongodbClient = require('./mongoClient');
const globals = require('./models/global');
const mongoQueries = require('./scripts/mongoQueries');

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
    console.log('load team');
    console.log(req.body);
    const teamModel = require('./models/teamModel');
    const team = await teamModel(req.body.teamId, db);
    await res.json(team);
});

app.get('/loadPlayer', (req, res) => {
    console.log(req.body.position);
});

//TODO: can we make these one call? repeating alot of stuff
app.post('/filterGroupedColumnData', async (req, res) => {
    const getGroupedColumnData = require('./models/data/groupColData');
    const teamData = await getFullTeam(req.body.team, db);
    const filteredGroupedColumnData = await getGroupedColumnData(req.body.seriesValues, teamData[0].rushRec, req.body.filter)
    let result = {};
    result[req.body.updateState] = await filteredGroupedColumnData;
    await res.json(result);
});

app.post('/filterStackedColumnData', async (req, res) => {
    const getStackedColumnData = require('./models/data/stackedColData');
    const teamData = await mongoQueries.getFullTeam(req.body.team, db);
    const filteredStackedColumnData = await getStackedColumnData(req.body.seriesValues, teamData[0].rushRec, req.body.filter);
    let result = {};
    result[req.body.updateState] = await filteredStackedColumnData;
    await res.json(result);
});

app.post('/filterColumnData', async (req, res) => {
    const getColumnPlayerData = require('./models/data/getColumnPlayerData');
    const teamData = await mongoQueries.getFullTeam(req.body.team, db);
    const filteredColumnData = await getColumnPlayerData(req.body.seriesValues, teamData[0].rushRec, req.body.filter);
    let result = {};
    result[req.body.updateState] = await filteredColumnData;
    await res.json(result);
});

app.post('/loadPositions', async (req, res) => {
    const position = req.body.position;
    if (position === 'Running Back') {
        const RBModel = require('./models/positions/runningback');
        const rushingData = await RBModel(db);
        await res.json( {
            header: globals.rbTableHeader,
            position: rushingData
        });
    } else if (position === 'Quarterback') {
        const QBModel = require('./models/positions/quarterback');
        const passingData = await QBModel(db);
        await res.json({
           header: globals.qbTableHeader, 
           position: passingData
        });
    } else if (position === 'Wide Receiver' || position === 'Tight End') {
        const ReceivingModel = require('./models/positions/receiver');
        let receivingData;
        if (position === 'Wide Receiver') {
            receivingData = await ReceivingModel(db, 'wr');
        } else {
            receivingData = await ReceivingModel(db, 'te');
        }
        await res.json({
            header: globals.receivingTableHeader,
            position: receivingData
        });
    }
    console.log(req.body.position);
})

const port = process.env.PORT || 4000;

app.listen(port, ()=> {
    console.log('listening on ' + port);
});