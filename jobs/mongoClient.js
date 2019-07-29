const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, (err, db)=> {
    if (err) {
        throw err;
    }
    const dbo = db.db('fantasyfootball_now');
    
});
