//Stress test up to 40 agents

require("babel-core/register");
var PlayerClient = require('./src/PlayerClient.js').default;
var url = 'http://marmaladebacon.com';

let count = 0;
let players = [];
//Try not to go crazy on my server please =P
setInterval(()=>{
    if(count < 5){
        let p = new PlayerClient(url, 'matthew:'+count);
        p.Go();
        players.push(p);
        count+=1;
    }
}, 2000);
