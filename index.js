const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan'),
      bodyParser = require('body-parser');

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

app.get('/getTeams', (req, res) => {
    const teams = require('./models/teams.js');
    res.json(teams);
});

app.post('/loadTeam', (req, res) => {
    console.log('this happening??');
    console.log(req.body);
    let teamInfo = {};
    teamInfo.teamId = req.body.teamId;
    console.log(teamInfo);
    res.json(teamInfo)
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> {
    console.log('listening on ${port}');
});
