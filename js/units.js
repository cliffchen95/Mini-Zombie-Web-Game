class Unit {
  direction = {
    up: false,
    down: false,
    left: false,
    right: false
  }
  constructor(x, y, speed, radius) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
  }
  move() {
    if (this.direction.up) this.y -= this.speed;
    if (this.direction.left) this.x -= this.speed;
    if (this.direction.right) this.x += this.speed;
    if (this.direction.down) this.y += this.speed;
  }
  setDirection(key) {
    if(key == 'w') this.direction.up = true;
    if(key == 'a') this.direction.left = true;
    if(key == 's') this.direction.down = true;
    if(key == 'd') this.direction.right = true;
  }
  unsetDirection(key) {
    if(key == 'w') this.direction.up = false;
    if(key == 'a') this.direction.left = false;
    if(key == 's') this.direction.down = false;
    if(key == 'd') this.direction.right = false;
  }
  checkCollision(unit) { // note this is designed to check for coll w/ other RECTs specifically
    if(
      this.x + this.radius > unit.x &&
      this.x < unit.x + unit.radius && 
      this.y + this.radius > unit.y &&
      this.y < unit.y +unit.radius
    ) {
      console.log('collision');
      return true
    }  
    else return false
  }
}

class Citizen extends Unit {
  color = 'white';
  turnIntoZombie() {
    // create a new zombie
    const zombie = new Zombie(this.x, this.y, 5, 10);
    return zombie;
  }
}

class Zombie extends Unit {
  color = 'red';
}

class Player extends Unit {
  color = 'yellow'
}