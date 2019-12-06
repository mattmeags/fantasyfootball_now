const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ffNow:Kimball1890@@cluster0-ad3fi.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let _db, _client;

module.exports = {
  createConnection: function(callback) {
    client.connect((err, db) => {
    
      // perform actions on the collection object
      if (err) {
        throw err;
      }
      console.log(db);
      //const collection = client.db("ffNow").collection("test");
      _client = db;
      _db = db.db("ffNow");
      if (callback) {
        return callback();
      } else {
        return;
      }
    });  
  },
  getDb: function() {
    return _db;
  },
  closeConnection: function() {
    _client.close();   
  }
}
