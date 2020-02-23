const leftDir = new Vector2(-1, 0);
const rightDir = new Vector2(1, 0);
const upDir = new Vector2(0, -1);
const downDir = new Vector2(0, 1);


// return manhattan distance between a and b
// param: a, b: Vector2
const manhattanDistance = function(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// return a list of available neighbours of the position
// each element contains direction and position [dir, position]
// dir: 0 -> left, 1 -> right, 2 -> top, 3 -> bottom
const getAvailableNeighbours = function(snake, position) {
    let left = position.createNew(leftDir);
    let right = position.createNew(rightDir);
    let top = position.createNew(upDir);
    let bottom = position.createNew(downDir);

    let neighbours = [left, right, top, bottom];
    let availableNeighbours = [];
    for (let i = 0; i < 4; i++) {
        if (!snake.isCollided(neighbours[i]))
            availableNeighbours.push([i, neighbours[i]]);
    }
    return availableNeighbours;
}

// return the next direction (Vector2)
const greedyAlgorithm = function(snake) {
    let head = snake.bodyList[0];
    let food = snake.food;
    let availableNeighbours = getAvailableNeighbours(snake, head);

    // if there is no way out
    if (availableNeighbours.length == 0)
        return leftDir;

    let minDist = manhattanDistance(availableNeighbours[0][1], food);
    let choice = availableNeighbours[0][0];
    for (let i = 1; i < availableNeighbours.length; i++) {
        let dist = manhattanDistance(availableNeighbours[i][1], food);
        if (dist < minDist) {
            minDist = dist;
            choice = availableNeighbours[i][0];
        }
    }

    switch(choice) {
        case 0:
            return leftDir;
        case 1:
            return rightDir;
        case 2:
            return upDir;
        case 3:
            return downDir;
        default:
            return leftDir;
    }
}

function AStarNode(position, previous, direction, gScore, hScore) {
    this.position = position;
    this.previous = previous;
    this.direction = direction;
    this.gScore = gScore;
    this.hScore = hScore;
    this.fScore = gScore + hScore;
}
AStarNode.prototype.compareTo = function(otherAStarNode) {
    return this.fScore - otherAStarNode.fScore;
}

// implement Min heap
const priorityQ_decreaseKey = function(queue, i, newKey) {
    if (newKey >= queue[i]) {
        console.log(`newKey (${newKey}) >= queue[${i}] (${queue[i]})`);
        return;
    }

    queue[i].fScore = newKey;
    while (i > 0) {
        let parentIndex = Math.floor((i - 1) / 2);
        if (queue[parentIndex].compareTo(queue[i]) < 0)
            break;
        
        // exchange parent and current
        let temp = queue[parentIndex];
        queue[parentIndex] = queue[i];
        queue[i] = temp;
        i = parentIndex;
    }
}

// queue: a priorityQueue (an array)
// node: an AStarNode
const priorityQ_enqueue = function(queue, node) {
    let fScore = node.fScore;
    node.fScore = 1000; // very large
    queue.push(node);
    let i = queue.length - 1;
    priorityQ_decreaseKey(queue, i, fScore);
}

// return the smallest element of the queue
const priorityQ_dequeue = function(queue) {
    let node = queue[0];
    queue[0] = queue[queue.length - 1];
    queue.pop();

    // min-heapify
    let parentIndex = 0;
    let lastIndex = queue.length - 1;
    while (true) {
        let leftIndex = parentIndex * 2 + 1;
        if (leftIndex > lastIndex)
            break;
        let ci = leftIndex;
        let rightIndex = leftIndex + 1;
        if (rightIndex <= lastIndex && queue[rightIndex].compareTo(queue[leftIndex]) < 0) 
            ci = rightIndex;
        if (queue[parentIndex].compareTo(queue[ci]) <= 0)
            break;
        
        // exchange queue[ci] with queue[parentIndex]
        let temp = queue[parentIndex];
        queue[parentIndex] = queue[ci];
        queue[ci] = temp;
        parentIndex = ci;
    }
    return node;
}

// return the index of the position (not node) if exists, -1 if not found
const priorityQ_indexOf = function(queue, position) {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].position.equals(position))
            return i;
    }
    return -1;
}

// return a list of movements
// 0 -> left, 1 -> right, 2 -> up, 3 -> down
const AStarAlgorithm = function(snake) {
    let head = snake.bodyList[0];
    let food = snake.food;
    let startNode = new AStarNode(head, null, 0, manhattanDistance(head, food));
    let currentNode;
    let openSet = [startNode];
    let closeSet = [];

    let found = false;
    while (openSet.length > 0) {
        currentNode = priorityQ_dequeue(openSet);
        if (currentNode.position.equals(food)) {
            found = true;
            break;
        }

        // only open a position once
        if (priorityQ_indexOf(closeSet, currentNode.position) != -1)
            continue;
        closeSet.push(currentNode);
        let availableNeighbours = getAvailableNeighbours(snake, currentNode.position);
        for (let i = 0; i < availableNeighbours.length; i++) {
            let neighbour = availableNeighbours[i][1];
            let direction = availableNeighbours[i][0];
            let index = priorityQ_indexOf(openSet, neighbour);
            if (index == -1) {
                // if neighbour is not in openSet, create a node and enqueue it
                let node = new AStarNode(neighbour, currentNode, direction,
                    currentNode.gScore + 1, manhattanDistance(neighbour, food));
                priorityQ_enqueue(openSet, node);
            } else {
                // if the currentNode.gScore + 1 < previous gScore, update
                let diff = openSet[index].gScore - (currentNode.gScore + 1);
                if (diff > 0) {
                    openSet[index].gScore -= diff;
                    priorityQ_decreaseKey(openSet, index, openSet[index].fScore - diff);
                }
            }
        }
    }

    if (!found) {
        console.log("Not found");
        return [-1];
    }

    let moves = [];
    while (currentNode != null) {
        moves.push(currentNode.direction);
        currentNode = currentNode.previous;
    }
    moves.pop();    // remove the direction of the starting node
    return moves;
}