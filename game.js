const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const score = {
  player: 0,
  ai: 0
};

const player = {
  x: 20,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  color: "GREEN"
};

const ai = {
  x: canvas.width - 30,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  color: "RED",
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

function drawScore() {
  ctx.font = '48px monospace';
  ctx.fillStyle = 'ORANGE';
  ctx.fillText(score.player, canvas.width / 4, 50);
  ctx.fillText(score.ai, (3 * canvas.width) / 4, 50);
}

function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  let gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, "YELLOW");
  gradient.addColorStop(1, "WHITE");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function update() {
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

  if (ball.x + ball.radius > canvas.width) {
    score.player++;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
  } else if (ball.x - ball.radius < 0) {
    score.ai++;
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

  let bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bgGradient.addColorStop(0, "#282828");
  bgGradient.addColorStop(1, "#000000");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
  drawScore();
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

function updatePlayerPosition(event) {
  let rect = canvas.getBoundingClientRect();
  let clientY;

  // Check if event is from a touch or mouse event
  if (event.type === "touchmove") {
    clientY = event.touches[0].clientY;
  } else {
    clientY = event.clientY;
  }

  player.y = clientY - rect.top - player.height / 2;

  // Constrain the player paddle to stay within the canvas

  if (player.y < 0) {
    player.y = 0;
  } else if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  }
}

// Add event listeners for both mouse and touch events
canvas.addEventListener("mousemove", updatePlayerPosition);
canvas.addEventListener("touchmove", updatePlayerPosition);

gameLoop();

