let canvas;
let ctx;
let snake;
let updateEventId;
let gameStatus;
let updateFrequency = 200;

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

const initialize = function() {
    snake = new Snake(20, 15, ctx);
}


const update = function() {
    if (snake.update()) {
        clearInterval(updateEventId);
        ctx.font = "100px Arial";
        ctx.fillText("Game Over", 135, 250);

        console.log("Game Over!");
        gameStatus = "over";
    }
}

document.onkeydown = function(event) {
    let keyCode;

    if (event == null) {
        keyCode = window.event.keyCode;
    } else {
        keyCode = event.keyCode;
    }

    let newDirection = null;
        switch(keyCode) {
            case leftKey:
                newDirection = new Vector2(-1, 0);
                break;
            case upKey:
                newDirection = new Vector2(0, -1);
                break;
            case rightKey:
                newDirection = new Vector2(1, 0);
                break;
            case downKey:
                newDirection = new Vector2(0, 1);
                break;
            default:
                break;
        }
    if (newDirection != null)
        snake.updateDirection(newDirection);
}

const checkCanvasSupported = function() {
    canvas = document.getElementById("map");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
         
    } else {
        alert("Your browser does not support the canvas tag!");
    }
}

const newGame = function() {
    if (gameStatus != undefined || gameStatus != "over") {
        clearInterval(updateEventId);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("score").innerText = "0";
    initialize();
    updateEventId = setInterval(update, updateFrequency);
    gameStatus = "ongoing";
    document.getElementById("restart").innerText = "Restart";
}

const pause_play = function() {
    if (gameStatus == "ongoing") {
        clearInterval(updateEventId);
        gameStatus = "paused";
        document.getElementById("pause").innerText = "Play";
    } else if (gameStatus == "paused") {
        updateEventId = setInterval(update, updateFrequency);
        gameStatus = "ongoing";
        document.getElementById("pause").innerText = "Pause";
    }
}

const updateSpeed = function() {
    let speedText = document.getElementById("speed").value;
    let speed = parseInt(speedText);
    if (isNaN(speed) || speed < 0 || speed > 10)
        return;

    updateFrequency = (10.5 - speed) * 80;
    if (gameStatus == "ongoing") {
        clearInterval(updateEventId);
        updateEventId = setInterval(update, updateFrequency);
    }
}