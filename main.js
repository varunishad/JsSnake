const KEY = {
    LEFT: [65, 37],
    RIGHT: [68, 39],
    DOWN: [83, 40],
    UP: [87, 38]
};
Object.freeze(KEY);

const BOX = 32;

const LEFT_WALL = 0;
const RIGHT_WALL = 15 * BOX;
const BOTTOM_WALL = 15 * BOX;
const TOP_WALL = 0;

let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let snake = [];
snake[0] = {
    x: 8 * BOX,
    y: 8 * BOX
}
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 15 + 1) * BOX,
    y: Math.floor(Math.random() * 15 + 1) * BOX
}

function createBackground() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, 16 * BOX, 16 * BOX);
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "blue";
        ctx.fillRect(snake[i].x, snake[i].y, BOX, BOX);
    }
}

function createFood() {
    ctx.fillStyle = "green";
    ctx.fillRect(food.x, food.y, BOX, BOX);
}

document.addEventListener('keydown', update);

function update(event) {
    if (KEY.LEFT.includes(event.keyCode) && direction != 'right') direction = 'left'
    if (KEY.RIGHT.includes(event.keyCode) && direction != 'left') direction = 'right'
    if (KEY.DOWN.includes(event.keyCode) && direction != 'up') direction = 'down'
    if (KEY.UP.includes(event.keyCode) && direction != 'down') direction = 'up'
}

function gameLoop() {
    if (snake[0].x > RIGHT_WALL) snake[0].x = LEFT_WALL;
    if (snake[0].x < LEFT_WALL) snake[0].x = RIGHT_WALL;
    if (snake[0].y > BOTTOM_WALL) snake[0].y = TOP_WALL;
    if (snake[0].y < TOP_WALL) snake[0].y = BOTTOM_WALL;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert(`Turrrrrrrrr The End! Your score: ${snake.length} `)

        }
    }

    createBackground();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'right') snakeX += BOX;
    if (direction == 'left') snakeX -= BOX;
    if (direction == 'down') snakeY += BOX;
    if (direction == 'up') snakeY -= BOX;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * BOX;
        food.y = Math.floor(Math.random() * 15 + 1) * BOX;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

let game = setInterval(gameLoop, 100);