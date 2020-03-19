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
}

class Citizen extends Unit {
  color = 'white';
  turnIntoZombie() {
    // create a new zombie
    const zombie = new Zombie(this.x, this.y, 0.6, 10);
    return zombie;
  }
  setDirection() {
    this.direction.x = (Math.random() - 0.5) * 1.2;
    this.direction.y = (Math.random() - 0.5) * 1.2;
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
    const distance = this.getDistance(unit)
    this.direction.x = x / distance;
    this.direction.y = y / distance;
  }
  checkCollision(unit) {
    if (this.getDistance(unit) <= this.radius + unit.radius) {
      return true;
    } else {
      return false;
    }
  }
}

class Player extends Unit {
  color = 'yellow'
  constructor(x, y, speed, radius, weapon) {
    super(x, y, speed, radius);
    this.weapon = weapon;
  }
  getDirection() {
    const x = this.direction.x / Math.sqrt(this.direction.x + this.direction.y);
    const y = this.direction.y / Math.sqrt(this.direction.x + this.direction.y);
    return [
      x: x,
      y: y
    ]
  }
}