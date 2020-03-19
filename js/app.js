const app = {
  players: [],
  zombies: [],
  citizens: [],
  ctx: null,
  timerID: null,
  timer: 0,
  positions: [],

  initializePlayer() {
    const player = new Player(400, 400, 2, 10, 'sword');
    this.players.push(player);
  },
  startTimer() {
    this.timerID = setInterval(() => {
      if (this.timer % 5 == 2) {
        const x = Math.floor(Math.random() * 980) + 10;
        const y = Math.floor(Math.random() * 780) + 10;
        this.createZombie(x, y);
        const i = Math.floor(Math.random() * 980) + 10;
        const j = Math.floor(Math.random() * 780) + 10;
        this.createCitizen(i, j);
      }
      this.timer++;
    }, 1000);
  },
  createCanvas() {
    const convas = document.createElement('canvas');
    const body = document.querySelector('body');
    body.appendChild(convas);
    convas.style.width = '1000px';
    convas.width = 1000;
    convas.style.height = '800px';
    convas.height = 800;
    this.ctx = convas.getContext('2d');
  },
  clearCanvas() {
    app.ctx.clearRect(0, 0, 1000, 800);
  },
  createZombie(x, y) {
    const zombie = new Zombie(x, y, 0.5, 10);
    this.zombies.push(zombie);
  },
  createCitizen(x, y) {
    const citizen = new Citizen(x, y, 0.4, 10);
    this.citizens.push(citizen);
  },
  spawnUnit(unit) {
    this.ctx.beginPath();
    this.ctx.arc(unit.x, unit.y, unit.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = unit.color;
    this.ctx.fill();
  },
  getClosestUnit(zombie) {
    let distance = Number.POSITIVE_INFINITY;
    let unit = null;
    for (player of this.players) {
      if (distance > zombie.getDistance(player)) {
        distance = zombie.getDistance(player);
        unit = player;
      }
    }
    for (citizen of this.citizens) {
      if (distance > zombie.getDistance(citizen)) {
        distance = zombie.getDirection(citizen);
        unit = citizen;
      }
    }
    return unit;
  },
  citizenAttacked(zombie) {
    for (let i = 0; i < this.citizens.length; i++) {
      if (zombie.checkCollision(this.citizens[i])) {
        this.zombies.push(this.citizens[i].turnIntoZombie());
        this.citizens.splice(i, 1);
        return;
      }
    }
  },
  displayWeapon(player) {
    const direction = player.directionFacing;
    if (player.weapon == 'sword') {
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(player.x + direction.x * 14, player.y + direction.y * 14);
      this.ctx.lineTo(player.x + direction.x * 42, player.y + direction.y * 42);
      this.ctx.stroke();
    }
    if (player.weapon == 'gun') {
      this.ctx.lineWidth = 5;
      this.ctx.beginPath();
      this.ctx.moveTo(player.x + direction.x * 14, player.y + direction.y * 14);
      this.ctx.lineTo(player.x + direction.x * 25, player.y + direction.y * 25);
      this.ctx.moveTo(player.x + direction.x * 14, player.y + direction.y * 14);
      if (direction.x == 0) {
        this.ctx.lineTo(player.x + direction.x * 14 + direction.y * 10, player.y + direction.y * 14);
      } else if (direction.y == 0) {
        this.ctx.lineTo(player.x + direction.x * 14, player.y + direction.y * 14 + direction.x * 10);
      } else {
        this.ctx.lineTo(player.x + direction.x * 14 - direction.y * 10, player.y + direction.y * 14 + direction.x * 14);
      }
      this.ctx.stroke();
    }
  },
  animate() {
    app.clearCanvas();
    app.ctx.beginPath();
    app.ctx.font = '30px serif';
    app.ctx.fillStyle = '#ffffff'
    app.ctx.fillText(`Time to Daylight: ${app.timer}`, 700, 30)
    for (player of app.players) {
      app.spawnUnit(player);
      app.displayWeapon(player);
      player.move();
    }
    for (zombie of app.zombies) {
      app.spawnUnit(zombie);
      zombie.getDirection(app.getClosestUnit(zombie));
      zombie.move();
      app.citizenAttacked(zombie);
    }
    for (citizen of app.citizens) {
      app.spawnUnit(citizen);
      citizen.setDirection();
      citizen.move();
    }
    window.requestAnimationFrame(app.animate);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.keyCode == 39) {
    app.players[0].direction.x = 1;
    app.players[0].setDirectionFacing();
  } else if (event.keyCode == 37) {
    app.players[0].direction.x = -1;
    app.players[0].setDirectionFacing();
  } else if (event.keyCode == 38) {
    app.players[0].direction.y = -1;
    app.players[0].setDirectionFacing();
  } else if (event.keyCode == 40) {
    app.players[0].direction.y = 1;
    app.players[0].setDirectionFacing();
  }
})
document.addEventListener('keyup', (event) => {
  if (event.keyCode == 39) {
    app.players[0].direction.x = 0;
  } else if (event.keyCode == 37) {
    app.players[0].direction.x = 0;
  } else if (event.keyCode == 38) {
    app.players[0].direction.y = 0;
  } else if (event.keyCode == 40) {
    app.players[0].direction.y = 0;
  }
})


// app.initializePlayer();
// app.createCanvas();
// app.startTimer();
// app.animate();