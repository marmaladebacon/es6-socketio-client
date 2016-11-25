require("babel-core/register");
//use .default otherwise it won't work'
var PlayerClient = require('./src/PlayerClient.js').default;
var url = 'http://localhost:8000'; //http://marmaladebacon.com/#/simulation
//var url = 'http://marmaladebacon.com';
var player = new PlayerClient(url, 'matthew');
player.Go();