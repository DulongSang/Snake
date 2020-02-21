let canvas;
let ctx;
let snake;
let updateEventId;
const updateFrequency = 200;

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
        console.log("Game Over!");
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
                console.log("left");
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

function checkCanvasSupported() {
    let canvas = document.getElementById("map");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        initialize();
        updateEventId = setInterval(update, updateFrequency); 
    } else {
        alert("Your browser does not support the canvas tag!");
    }
}