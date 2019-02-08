const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      convertor = require('./convertor');

const app = express();


//Require static data
const teams = require("./models/teams.js"); 

//TODO get some comments here
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

//TODO rename both routes
app.get('/getTeams', (req, res) => {
    console.log('here');
    const teams = require('./models/teams.js');
    res.json(teams);
});

app.post('/loadTeam', async (req, res) => {
    console.log('this happening??');
    console.log(req.body);
    //req.params
    let teamInfo = await convertor.initTeam(req.body.teamId);
    //teamInfo.mascot = req.body.teamId;
    res.json(teamInfo)
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> {
    console.log('listening on ${port}');
});