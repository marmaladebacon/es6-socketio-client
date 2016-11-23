require("babel-core/register");
var PlayerClient = require('./src/playerClient.js').default;
var url = 'http://localhost:8888';
var player = new PlayerClient(url, 'matthew');
player.Go();