import io from 'socket.io-client';

export default class PlayerClient{
    constructor(url, playerName){
        this.url = url;
        this.playerName = playerName;
    }

    Go(){
        this.socket = io.connect(this.url,{reconnect:true});
        this.socket.on('connect', ()=>{
            console.log('Connecting from node client');
            this.socket.emit('join', {roomName: 'players', playerName: this.playerName});
        });
        let boundloop = this.logicLoop.bind(this);
        let fps = 30;
        setInterval(boundloop, 1000/fps);
    }

    logicLoop(){
        //debugger;
        this.socket.emit('setvelocity', {x:1, y:1});
    }
}
