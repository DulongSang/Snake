let leftDir = new Vector2(-1, 0);
let rightDir = new Vector2(1, 0);
let upDir = new Vector2(0, -1);
let downDir = new Vector2(0, 1);


// return the next direction (Vector2)
const greedyAlgorithm = function(snake) {
    let head = snake.bodyList[0];
    let food = snake.food;
    let left = head.createNew(leftDir);
    let right = head.createNew(rightDir);
    let top = head.createNew(upDir);
    let bottom = head.createNew(downDir);

    let priority = [
        [snake.isCollided("check", left), manhattanDistance(left, food)],
        [snake.isCollided("check", right), manhattanDistance(right, food)],
        [snake.isCollided("check", top), manhattanDistance(top, food)],
        [snake.isCollided("check", bottom), manhattanDistance(bottom, food)]
    ];

    let minDist = 100;
    let choice = 0;
    for (let i = 0; i < 4; i++) {
        if (!priority[i][0] && priority[i][1] < minDist) {
            minDist = priority[i][1];
            choice = i;
        }
    }

    let nextDir;
    switch(choice) {
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
            break;
    }
    return nextDir;
}

// return manhattan distance between a and b
// param: a, b: Vector2
const manhattanDistance = function(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}


const 