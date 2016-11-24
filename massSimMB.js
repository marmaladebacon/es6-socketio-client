//Stress test up to 40 agents

require("babel-core/register");
var PlayerClient = require('./src/playerClient.js').default;
var url = 'http://marmaladebacon.com';

let count = 0;
let players = [];
setInterval(()=>{
    if(count < 40){
        let p = new PlayerClient(url, 'matthew:'+count);
        p.Go();
        players.push(p);
        count+=1;
    }
}, 2000);
