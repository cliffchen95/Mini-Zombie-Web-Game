class Unit {
    constructor(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }
    move() {
        this.x += velocityX;
        this.y += velocityY;
    }
    turnDirection(velocityX, velocityY) {
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }
}

class Citizen extends Unit{
    color = 'white';
    turnIntoZombie() {
        // create a new zombie
        const zombie = new Zombie(this.x, this.y, 0, 0);
        return zombie;
    }
}
class Zombie extends Unit{
    color = 'red';
}