import io from 'socket.io-client';
import PlayerClientModel from './PlayerClientModel';
import _ from 'lodash';

export default class PlayerClient{
    constructor(url, playerName){
        this.url = url;
        this.playerName = playerName;
        this.model = new PlayerClientModel();
        this.otherPlayers = [];
        this.noms = [];
    }
    //Dale mentioned that new hires would also need to know about async callbacks, closures
    Go(){
        this.socket = io.connect(this.url,{reconnect:true});

        this.socket.on('connect', ()=>{
            console.log('Connecting from node client');
            this.socket.emit('join', {roomName: 'players', playerName: this.playerName});
        });

        this.socket.on('playerClientData', (data)=>{
            console.log('Receiving client data');
            this.model.update(data);
        });

        this.socket.on('playersLocationsData', (data)=>{
            this.otherPlayers = data;
        });

        this.socket.on('nomsLocationsData', (data)=>{
            this.noms = data;
        });

        let boundloop = this.logicLoop.bind(this);
        let fps = 15;
        setInterval(boundloop, 1000/fps);
    }

    logicLoop(){
        //debugger;

        if(this.model.oldDataCount > 500){
            console.log('updating client data');
            this.socket.emit('updatePlayerClientData');
        }
        else if(this.noms.length === 0){
            console.log('updating noms data')
            this.socket.emit('updateNomsLocations');
        }

        let closestNom = this.ClosestNom();
        if(!_.isNull(closestNom) && !_.isUndefined(closestNom)){
            console.log('chasing noms');
            let deltaX = closestNom.x - this.model.posX;
            let deltaY = closestNom.y - this.model.posY;
            let length = Math.sqrt( (deltaX * deltaX) + (deltaY*deltaY) );
            this.socket.emit('setvelocity', {x:deltaX/length, y:deltaY/length});
        }else{
            console.log('No noms T.T'+ this.noms.length);
        }

        if(this.model.oldDataCount < 5000){ this.model.oldDataCount +=1;}
    }

    ClosestNom(){
        let result = null;
        let maxDistSq = 2;
        for(let i =0;i<this.noms.length; i++){

            let x = this.model.posX - this.noms[i].x;
            let y = this.model.posY - this.noms[i].y;
            let sq = x*x + y*y;
            if(maxDistSq > sq){
                maxDistSq = sq;
                result = this.noms[i];
            }
        }
        return result;
    }
}
