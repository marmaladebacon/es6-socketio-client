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
            this.socket.emit('join', {roomName: 'players', playerName: 'playerName'});
        });
        let boundloop = this.logicLoop.bind(this);
        let fps = 30;
        setInterval(boundloop, 1000/fps);
    }

    logicLoop(){
        this.socket.emit('move', {x:0.1, y:0.1});
    }
}