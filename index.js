const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      jsonQuery = require('json-query'),
      convertor = require('./convertor');
const mongodbClient = require('./mongoClient');
const globals = require('./models/global');

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
    console.log(req);
});

app.post('/loadPosition', async (req, res) => {
    let getPostionDataPromises = globals.teams.map(team => {
        new Promise(function (resolve, reject) {
            db.collection(team).find({}).toArray((err, res) => {
                if (err) {
                    throw (err);
                }
                resolve(res);
            });
        });
        Promise.all(getPostionDataPromises).then((responses) => {
            console.log(responses);
        });
    });
 req.body.position
})

const port = process.env.PORT || 4000;

app.listen(port, ()=> {
    console.log('listening on ' + port);
});