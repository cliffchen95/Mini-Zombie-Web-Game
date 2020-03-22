class Unit {
  direction = { x: 0, y: 0 }
  constructor(x, y, speed, radius) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
  }
  move() {
    if (this.x + this.speed * this.direction.x >= 10 && this.x + this.speed * this.direction.x <= 990) {
      this.x += this.speed * this.direction.x;
    }
    if (this.y + this.speed * this.direction.y >= 10 && this.y + this.speed * this.direction.y <= 790) {
      this.y += this.speed * this.direction.y;
    }
  }
}

class Citizen extends Unit {
  color = 'white';
  turnIntoZombie() {
    // create a new zombie
    const zombie = new Zombie(this.x, this.y, 0.6, 10);
    return zombie;
  }
  getDistance(unit) {
    const x = unit.x - this.x;
    const y = unit.y - this.y;
    return Math.sqrt(x ** 2 + y ** 2);
  }
  setDirection(unit) {
    if (unit !== null) {
      const x = unit.x - this.x;
      const y = unit.y - this.y;
      const distance = this.getDistance(unit)
      this.direction.x = -x / distance;
      this.direction.y = -y / distance;
    }
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
    if (unit !== null) {
      const x = unit.x - this.x;
      const y = unit.y - this.y;
      const distance = this.getDistance(unit)
      this.direction.x = x / distance;
      this.direction.y = y / distance;
    }
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
  color = 'yellow';
  score = 0;
  directionFacing = {
    x: 1,
    y: 0
  }
  constructor(x, y, speed, radius, weapon) {
    super(x, y, speed, radius);
    this.weapon = weapon;
  }
  setDirectionFacing(target) {
    if (this.weapon == 'sword') {
      this.directionFacing.x = this.direction.x / Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);
      this.directionFacing.y = this.direction.y / Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);
    }
    if (this.weapon == 'gun') {
      const x = target.clientX - this.x;
      const y = target.clientY - this.y;
      this.directionFacing.x = x / Math.sqrt(x ** 2 + y ** 2);
      this.directionFacing.y = y / Math.sqrt(x ** 2 + y ** 2);
    }
  }
  attack() {
    if (this.weapon == 'sword') {

    }
  }
}

class Bullet {
  speed = 5;
  atMaxRange = false;
  constructor(position, direction, range) {
    this.position = position;
    this.direction = direction;
    this.range = range;
    this.maxRange = this.maxRange(position, direction, range)
  }
  getDistance(unit) {
    const x = this.position.x - unit.x
    const y = this.position.y - unit.y
    return Math.sqrt(x**2 + y**2)
  }
  hit(unit) {
    if (this.getDistance(unit) <= unit.radius){
      return true;
    }
    return false;
  }
  maxRange(position, direction, range) {
    const maxRange = {
      x: position.x + direction.x * range,
      y: position.y + direction.y * range
    }
    return maxRange;
  }
  move() {
    this.position.x += this.speed * this.direction.x;
    this.position.y += this.speed * this.direction.y;
    if (Math.floor(this.position.x) == Math.floor(this.maxRange.x) && Math.floor(this.position.y) == Math.floor(this.maxRange.y)) {
      this.atMaxRange = true;
    }
  }
}