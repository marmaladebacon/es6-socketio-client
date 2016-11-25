
export default class PlayerClientModel{
    constructor(){
        this.posX = -1;
        this.posY = -1;
        this.velocityX = -1;
        this.velocityY = -1;
        this.radius = -1;
        this.energyLevel = -1;
        this.oldDataCount = 5000;
    }

    update(data){
        this.posX = data.posX;
        this.posY = data.posY;
        this.velocityX = data.velocityX;
        this.velocityY = data.velocityY;
        this.radius = data.radius;
        this.energyLevel = data.energyLevel;
        this.oldDataCount = 0;
    }
}