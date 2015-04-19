console.log(process.env.NODE_ENV);

var dbConnect = require('./db/db.setup');
var tweetProcessor = require('./ingest/tweet.processor');

dbConnect();
tweetProcessor();
