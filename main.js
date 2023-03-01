const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

sizeCanvas()

const state = {
  scale: 3,
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = new Image();
    this.sprite.src = './assets/characters/player.webp';
    this.columns = 6;
    this.rows = 14;
    this.frameX = 0;
    this.frameY = 1;
    this.frameW = this.sprite.width / this.columns;
    this.frameH = this.sprite.height / this.rows;
    this.counter = 0;

    this.lastDirection = 'right';

    this.controls = {
      up: false,
      right: false,
      down: false,
      left: false
    }

    this.states = [
      'idle-down',
      'idle-right',
      'idle-left',
      'idle-up',
      'walk-down',
      'walk-right',
      'walk-left',
      'walk-up',
      'attack-down',
      'attack-right',
      'attack-left',
      'attack-up',
      'die-right',
      'die-left'
    ];
    this.stateCols = [
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      4,
      4,
      4,
      4,
      3,
      3
    ]
  }
  update() {
    if (Object.values(this.controls).every((v) => v === false)) {
      if (this.lastDirection === 'up') this.frameY = 3;
      if (this.lastDirection === 'down') this.frameY = 0;
      if (this.lastDirection === 'right') this.frameY = 1;
      if (this.lastDirection === 'left') this.frameY = 2;
    } else {
      if (this.controls.up) this.frameY = 7;
      if (this.controls.down) this.frameY = 4;
      if (this.controls.right) this.frameY = 5;
      if (this.controls.left) this.frameY = 6;
    }


    if (this.counter % 10 === 0) {
      if (this.frameX >= this.stateCols[this.frameY] - 1) this.frameX = 0;
      else this.frameX++;

      this.counter = 0;
      this.counter++;
    } else {
      this.counter++;
    }
  }
  draw() {
    ctx.drawImage(this.sprite, this.frameX * this.frameW, this.frameY * this.frameH, this.frameW, this.frameH, this.x - (this.frameW * state.scale) / 2, this.y - (this.frameH * state.scale) * 0.85, this.frameW * state.scale, this.frameH * state.scale);
  }
}
const player = new Player(canvas.width / 2, canvas.height / 2);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  player.draw();

  requestAnimationFrame(animate);
}
animate();

function sizeCanvas(context) {
  canvas.width = 800;
  canvas.height = 600;
}

window.addEventListener('keydown', handleKeydown);
window.addEventListener('keyup', handleKeyup);

function handleKeydown(e) {
  const key = e.keyCode;
  if (key === 65) {
    player.controls.left = true;
    player.state = player.states[6]
  }
  if (key === 68) {
    player.controls.right = true;
    player.state = player.states[5]
  }
  if (key === 87) {
    player.controls.up = true;
    player.state = player.states[7]
  }
  if (key === 83) {
    player.controls.down = true;
    player.state = player.states[4]
  }
}

function handleKeyup(e) {
  const key = e.keyCode;
  if (key === 65) {
    player.controls.left = false;
    player.state = player.states[2]
    player.lastDirection = 'left';
  }
  if (key === 68) {
    player.controls.right = false;
    player.state = player.states[1]
    player.lastDirection = 'right';
  }
  if (key === 87) {
    player.controls.up = false;
    player.lastDirection = 'up';
    player.state = player.states[3]
  }
  if (key === 83) {
    player.controls.down = false;
    player.state = player.states[0]
    player.lastDirection = 'down';
  }
}