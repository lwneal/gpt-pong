const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const player = {
  x: 20,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  color: "WHITE",
  dy: 5
};

const ai = {
  x: canvas.width - 30,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  color: "WHITE",
  dy: 5
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  color: "WHITE",
  dx: 5,
  dy: 5
};

function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function update() {
  player.y += player.dy;
  ai.y += ai.dy;

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  if (
    (ball.x + ball.radius > player.x && ball.x < player.x + player.width) &&
    (ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height)
  ) {
    ball.dx = -ball.dx;
  }

  if (
    (ball.x - ball.radius < ai.x + ai.width && ball.x > ai.x) &&
    (ball.y + ball.radius > ai.y && ball.y - ball.radius < ai.y + ai.height)
  ) {
    ball.dx = -ball.dx;
  }

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
  }

  if (ball.y > ai.y + ai.height / 2) {
    ai.dy = 3;
  } else {
    ai.dy = -3;
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function gameLoop() {
  update();
  render();
    //TODO
