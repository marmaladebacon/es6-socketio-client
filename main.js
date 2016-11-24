require("babel-core/register");
//use .default otherwise it won't work'
var PlayerClient = require('./src/PlayerClient.js').default;
var url = 'http://mkopc.pc.factset.com:8888';
var player = new PlayerClient(url, 'matthew');
player.Go();