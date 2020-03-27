const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ffNow:Kimball1890@@cluster0-ad3fi.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let _db, _client;

module.exports = {
  createConnection: function(callback) {
    client.connect((err, db) => {
    
      if (err) {
        throw err;
      }

      _client = db;
      _db = db.db("ffNow");
      if (callback) {
		  console.log('callback');
        return callback();
      } else {
        return;
      }
    });  
  },
  getDb: function() {
	console.log('created??')
    return _db;
  },
  closeConnection: function() {
    _client.close();   
  }
}
