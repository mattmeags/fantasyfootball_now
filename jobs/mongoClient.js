const teams = require('../models/global').teams;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ffNow:Kimball1890@@cluster0-ad3fi.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, db) => {
  
  // perform actions on the collection object
  if (err) {
    throw err;
  }
  //const collection = client.db("ffNow").collection("test");
  const dbo = db.db("ffNow");
  console.log(dbo);
  // dbo.createCollection('test', function(err, res) {
  //   if (err) {
  //     console.log('line 15');
  //     throw (err);
  //   }
  //   console.log('collectionCreated');
    
  // });

  addTeamCollectionData(dbo);
  // dbo.collection('test').insertOne({test: 'test'}, function(err, res) {
  //   if (err) {
  //     console.log('line 23');
  //     throw (err);
  //   }
  //   console.log("1 document inserted");
  //   db.close();
  // });
  db.close();
});


function addTeamCollectionData(dbo) {
  console.log(teams.length)
  teams.forEach(team => {
    const teamRushRecCollection = require('../data_files/json/' + team + '/rushRec');
    const teamPassCollection = require('../data_files/json/' + team + '/passing');

    const teamCollection = teamRushRecCollection.concat(teamPassCollection);
    // console.log(teamRushRecCollection);
    console.log(team);
    dbo.collection(team).insertMany(teamCollection, function(err, res) {
      if (err) {
        console.log('line 23');
        throw (err);
      }
      console.log("Number of documents inserted: " + res.insertedCount);
    });
  })
  
}