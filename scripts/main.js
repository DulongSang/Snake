let canvas;
let ctx;
let snake;
let updateEventId;
let gameStatus;
let updateFrequency = 80;
let update;
let currentAI;
let moves = [];

const spaceKey = 32;
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

const initialize = function() {
    snake = new Snake(20, 15, ctx);
}

const defaultUpdate = function() {
    if (snake.update()) {
        gameOver();
    }
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

    document.getElementById("menu_container").classList.add("hide");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("score").innerText = "0";
    initialize();
    updateEventId = setInterval(update, updateFrequency);
    gameStatus = "ongoing";
}

const pause_play = function() {
    if (gameStatus == "ongoing") {
        clearInterval(updateEventId);
        gameStatus = "paused";
        document.getElementById("pause_button").innerText = "Continue";
    } else if (gameStatus == "paused") {
        updateEventId = setInterval(update, updateFrequency);
        gameStatus = "ongoing";
        document.getElementById("pause_button").innerText = "Pause";
    }
}

const updateSpeed = function() {
    let speedText = document.getElementById("speed").value;
    let speed = parseInt(speedText);
    if (isNaN(speed) || speed < 0 || speed > 10)
        return;

    updateFrequency = (3.07 - Math.sqrt(speed)) * 100;   // linearize the speed
    if (gameStatus == "ongoing") {
        clearInterval(updateEventId);
        updateEventId = setInterval(update, updateFrequency);
    }
}

const gameOver = function() {
    clearInterval(updateEventId);

    console.log("Game Over!");
    gameStatus = "over";
    
    document.getElementById("menu_container").classList.remove("hide");
    document.getElementById("menu_text").innerText = "Game Over";
}

const onkeydownHandler = function(event) {
    let keyCode;

    if (event == null) {
        keyCode = window.event.keyCode;
    } else {
        keyCode = event.keyCode;
    }

    let newDirection = null;
        switch(keyCode) {
            case leftKey:
                newDirection = leftDir;
                break;
            case upKey:
                newDirection = upDir;
                break;
            case rightKey:
                newDirection = rightDir;
                break;
            case downKey:
                newDirection = downDir;
                break;
            case spaceKey:
                pause_play();
                break;
            default:
                break;
        }
    if (newDirection != null)
        snake.updateDirection(newDirection);
}

const simpleGreedyUpdate = function() {
    snake.updateDirection(greedyAlgorithm(snake));
    defaultUpdate();
}

const AStarUpdate = function() {
    if (moves.length == 0) {
        moves = AStarAlgorithm(snake);
    }
    let nextMove = moves.pop();
    let nextDir;
    switch(nextMove) {
        case 0:
            nextDir = leftDir;
            break;
        case 1:
            nextDir = rightDir;
            break;
        case 2:
            nextDir = upDir;
            break;
        case 3:
            nextDir = downDir;
            break;
        default:
            nextDir = leftDir;
            break;
    }
    snake.updateDirection(nextDir);
    defaultUpdate();
}

const updateAIMode = function() {
    if (document.getElementById("none-ai").checked) {
        currentAI = "none";
        update = defaultUpdate;
        document.onkeydown = onkeydownHandler;
    } else if (document.getElementById("simple-greedy").checked) {
        currentAI = "simple greedy";
        update = simpleGreedyUpdate;
        document.onkeydown = null;
    } else if (document.getElementById("astar").checked) {
        currentAI = "astar";
        update = AStarUpdate;
        document.onkeydown = null;
    }
    
    moves = []; // empty moves array
    if (gameStatus == "ongoing") {
        clearInterval(updateEventId);
        updateEventId = setInterval(update, updateFrequency);
    }
}


update = defaultUpdate;
currentAI = "none";
checkCanvasSupported();
document.onkeydown = onkeydownHandler;
document.getElementById("menu_new_game").onclick = newGame;
document.getElementById("speed").oninput = updateSpeed;
document.getElementById("pause_button").onclick = pause_play;
document.getElementById("choose-ai").oninput = updateAIMode;