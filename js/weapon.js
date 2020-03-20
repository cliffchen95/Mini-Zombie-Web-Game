const gun = {
  range: 0,
  damage: 0,
  position: 0,
  bullets: []
  fireBullet() {

  }
}
class Bullet {
  speed = 5;
  constructor(position, direction, range) {
    this.position = position;
    this.direction = direction;
    this.range = range;
  }
  hit(unit) {
    if (this.position.x >= unit.x - unit.radius && this.position.y <= unit.x + unit.radius && this.position.y >= unit.y - unit.radius && this.position.y >= unit.y + unit.radius) {
      return unit
    }
    return null;
  }
  maxRange() {
    const maxRange = {
      x: this.position.x + this.direction.x * this.range,
      y: this.position.y + this.direction.y * this.range
    }
    return maxRange;
  }
  move() {
    const maxRange = this.maxRange();
    if (this.x + this.speed * this.direction.x <= maxRange.x) {
      this.x += this.speed * this.direction.x;
    }
    if (this.y + this.speed * this.direction.y <= maxRange.y) {
      this.y += this.speed * this.direction.y;
    }
  }
  const sword = {
    range: 0,
    damage: 0,
    position: [],
    attack() {

    }
  }