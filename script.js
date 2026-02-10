// Pong Game Logic

// Set up canvas
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Create the pong Paddle
const paddleWidth = 10;
const paddleHeight = 100;
const playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: 'blue', dy: 0 };
const aiPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: 'red', dy: 0 };

// Create the pong Ball
const ballRadius = 10;
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: ballRadius, speed: 5, velocityX: 5, velocityY: 5, color: 'green' };

// Control settings
const keyState = {};
window.addEventListener('keydown', (event) => { keyState[event.key] = true; });
window.addEventListener('keyup', (event) => { keyState[event.key] = false; });

function update() {
    // Move the paddles
    if (keyState['ArrowUp'] && playerPaddle.y > 0) {
        playerPaddle.y -= 10;
    }
    if (keyState['ArrowDown'] && playerPaddle.y < canvas.height - paddleHeight) {
        playerPaddle.y += 10;
    }

    // AI Movement
    if (ball.velocityX > 0) {
        if (aiPaddle.y + paddleHeight / 2 < ball.y) {
            aiPaddle.y += 4;
        } else {
            aiPaddle.y -= 4;
        }
    }

    // Move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top and bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Ball collision with paddles
    if (ball.x - ball.radius < playerPaddle.x + playerPaddle.width &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + paddleHeight) {
        ball.velocityX = -ball.velocityX;
    }
    if (ball.x + ball.radius > aiPaddle.x &&
        ball.y > aiPaddle.y &&
        ball.y < aiPaddle.y + paddleHeight) {
        ball.velocityX = -ball.velocityX;
    }

    // Reset ball if it goes out of bounds
    if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
}

function draw() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = playerPaddle.color;
    context.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);

    context.fillStyle = aiPaddle.color;
    context.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);

    // Draw ball
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);