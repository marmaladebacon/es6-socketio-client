//Stress test up to 40 agents

require("babel-core/register");
var PlayerClient = require('./src/PlayerClient.js').default;
var url = 'http://localhost:8000';

let count = 0;
let players = [];
setInterval(()=>{
    if(count < 15){
        let p = new PlayerClient(url, 'matthew:'+count);
        p.Go();
        players.push(p);
        count+=1;
    }
}, 2000);
