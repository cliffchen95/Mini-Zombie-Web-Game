const app = {
    players: [],
    zombies: [],
    citizens: [],
    ctx: null,
    timerID: null,
    timer: 0,

    startTimer() {
        this.timerID = setInterval(() => {
            this.ctx.font = '30px serif';
            this.timer++;
            this.ctx.fillText(`Time to Daylight: ${this.timer}`, 700, 30)
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
    spawnUnit(unit) {
        this.ctx.beginPath();
        this.ctx.arc(unit.x, unit.y, 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = unit.color;
        this.ctx.fill();
    },

}