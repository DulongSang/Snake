const gridSize = 30;
const bodyShort = 20;
const bodyLong = 25;
const bodyDiff = 5;
const boundary = [24, 19];

const bodyColor = "DeepPink";
const foodColor = "Aqua";

class Snake {

    // fields declared
    position;
    ctx;
    bodyList;
    length;
    direction;
    previousDir;
    food;
    score;

    constructor(x, y, ctx) {
        this.position = new Vector2(x, y);
        this.ctx = ctx;
        this.bodyList = [];
        this.direction = new Vector2(1, 0); // default to right
        this.previousDir = this.direction;
        this.generateFood();
        this.score = 0;
        
        // init the snake's body
        this.bodyList.push(this.position);
        let direction = this.direction.reverse();
        let body1position = this.position.add(direction);
        let body2position = body1position.add(direction);
        this.bodyList.push(body1position);
        this.bodyList.push(body2position);
        this.length = 3;
        ctx.fillStyle = bodyColor;
        ctx.fillRect(this.bodyList[0].toWorldX(), this.bodyList[0].toWorldY()+bodyDiff, bodyLong, bodyShort);
        ctx.fillRect(this.bodyList[1].toWorldX(), this.bodyList[1].toWorldY()+bodyDiff, gridSize, bodyShort);
        ctx.fillRect(this.bodyList[2].toWorldX(), this.bodyList[2].toWorldY()+bodyDiff, gridSize, bodyShort);
    }

    // return true if the game is over
    update() {
        this.position = this.position.add(this.direction);
        if (this.isCollided(this.position))
            return true;
        
        if (this.position.equals(this.food)) {
            // increase the snake's length
            let body = this.bodyList[this.length-1];
            this.bodyList.push(body);
            this.length += 1;

            // generate new food
            this.generateFood();

            // update score
            this.score += 10;
            document.getElementById("score").innerText = this.score;
        } else {
            // clear the last body rect
            let lastBody = this.bodyList[this.length-1];
            this.ctx.clearRect(lastBody.toWorldX(), lastBody.toWorldY(), gridSize, gridSize);
        }

        // move the last body to the front, and draw
        this.bodyList.pop();
        this.bodyList.unshift(this.position);
        this.drawSnake();

        return false;
    }

    // return true if target is collided with body or boundary, false otherwise
    isCollided(target) {
        // check body collision
        let i = 0;
        for (; i < this.length; i++) {
            if (target.equals(this.bodyList[i]))
                return true;
        }

        // check boundary collision
        if (target.x < 0 || target.x > boundary[0] ||
            target.y < 0 || target.y > boundary[1]) {
            return true;
        }
        
        return false;
    }

    updateDirection(newDirection) {
        if (!this.direction.equals(newDirection) && !this.direction.equals(newDirection.reverse())) {
            //console.log("direction changed: " + newDirection.toString());
            this.direction = newDirection;
        }
    }

    generateFood() {
        let x, y;
        let food;
        while (true) {
            x = Math.floor(Math.random() * boundary[0]);
            y = Math.floor(Math.random() * boundary[1]);
            food = new Vector2(x, y);
            if (!this.isCollided(food))
                break;
        }
        this.food = food;
        // draw food
        this.ctx.fillStyle = foodColor;
        this.ctx.fillRect(food.toWorldX()+bodyDiff, food.toWorldY()+bodyDiff, bodyShort, bodyShort);
    }

    drawSnake() {
        let x0 = this.bodyList[0].toWorldX();
        let y0 = this.bodyList[0].toWorldY();
        let x1 = this.bodyList[1].toWorldX();
        let y1 = this.bodyList[1].toWorldY();
        this.ctx.fillStyle = bodyColor;

        // draw the head and the second body
        if (this.direction.equals(leftDir)) {
            this.ctx.fillRect(x0 + bodyDiff, y0 + bodyDiff, bodyLong, bodyShort);
            this.ctx.fillRect(x1, y1 + bodyDiff, bodyLong, bodyShort);
        } else if (this.direction.equals(rightDir)) {
            this.ctx.fillRect(x0, y0 + bodyDiff, bodyLong, bodyShort);
            this.ctx.fillRect(x1 + bodyDiff, y1 + bodyDiff, bodyLong, bodyShort);
        } else if (this.direction.equals(upDir)) {
            this.ctx.fillRect(x0 + bodyDiff, y0 + bodyDiff, bodyShort, bodyLong);
            this.ctx.fillRect(x1 + bodyDiff, y1, bodyShort, bodyLong);
        } else {    // direction equals downDir
            this.ctx.fillRect(x0 + bodyDiff, y0, bodyShort, bodyLong);
            this.ctx.fillRect(x1 + bodyDiff, y1 + bodyDiff, bodyShort, bodyLong);
        }

        this.previousDir = this.direction;
    }
}