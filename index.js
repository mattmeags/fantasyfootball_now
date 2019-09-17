const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      jsonQuery = require('json-query'),
      convertor = require('./convertor');

const app = express();


//Require static data
const teams = require("./models/teams.js"); 

//express initilalizions
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
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
    const teams = require('./models/teams');
    console.log(req.body);

    let teamNameLocationData = jsonQuery('conferences[**][divisions][**][teams][name=' + req.body.teamId + ']', {data: teams}).value;
    
    console.log('finalData: ', teamNameLocationData);

    let teamInfo = await convertor.initTeam(req.body.teamId);

    teamInfo.mascot = teamNameLocationData.name;
    teamInfo.location = teamNameLocationData.location;
    res.json(teamInfo)
});

app.post('/loadPlayer', (req, res) => {
    console.log(req);
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> {
    console.log('listening on ' + port);
});