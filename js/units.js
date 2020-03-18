class Unit {
  direction = { x: 0, y: 0 }
  constructor(x, y, speed, radius) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
  }
  move() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
  }

  checkCollision(unit) { // note this is designed to check for coll w/ other RECTs specifically
    if (
      this.x + this.radius > unit.x &&
      this.x < unit.x + unit.radius &&
      this.y + this.radius > unit.y &&
      this.y < unit.y + unit.radius
    ) {
      console.log('collision');
      return true
    } else return false
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
  getDistance(unit) {
    const x = unit.x - this.x;
    const y = unit.y - this.y;
    return Math.sqrt(x ** 2 + y ** 2);
  }
  getDirection(unit) {
    const x = unit.x - this.x;
    const y = unit.y - this.y;
    const distance = Math.sqrt(x ** 2 + y ** 2);
    this.direction.x = x / distance;
    this.direction.y = y / distance;
  }
}

class Player extends Unit {
  color = 'yellow'
}