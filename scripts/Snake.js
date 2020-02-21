class Snake {
    rectWidth = 20;
    rectHeight = 20;
    boundary = [39, 29];

    headColor = "DarkViolet";
    bodyColor = "DeepPink";
    foodColor = "Aqua";
    
    // fields declared
    position;
    ctx;
    bodyList;
    length;
    direction;
    food;
    score;

    constructor(x, y, ctx) {
        this.position = new Vector2(x, y);
        this.ctx = ctx;
        this.bodyList = [];
        this.direction = new Vector2(1, 0); // default to right
        this.generateFood();
        this.score = 0;
        
        // init the snake's body
        this.bodyList.push(this.position.clone());
        let direction = this.direction.reverse();
        let body1position = this.position.createNew(direction);
        let body2position = body1position.createNew(direction);
        this.bodyList.push(body1position);
        this.bodyList.push(body2position);
        this.length = 3;
        this.drawRect(this.bodyList[0], this.headColor);
        for (let i = 1; i < this.length; i++) {
            this.drawRect(this.bodyList[i], this.bodyColor);
        }
    }

    // return true if the game is over
    update() {
        this.position.add(this.direction);
        if (this.isCollided())
            return true;
        
        if (this.position.equals(this.food)) {
            // increase the snake's length
            let body = this.bodyList[this.length-1].clone();
            this.bodyList.push(body);
            this.length += 1;
            this.drawRect(body, this.bodyColor);

            // generate new food
            this.generateFood();

            // update score
            this.score += 10;
            document.getElementById("score").innerText = this.score;
        } else {
            // clear the last body rect
            this.drawRect(this.bodyList[this.length-1], "clear");
        }

        // move the last body to the front, and draw
        this.bodyList.pop();
        this.bodyList.unshift(this.position.clone());
        this.drawRect(this.bodyList[0], this.headColor);
        this.drawRect(this.bodyList[1], this.bodyColor);

        return false;
    }

    // mode: "body", "food", "check"
    isCollided(mode="body", target=undefined) {
        let ignoreHead;
        if (mode == "body") {
            target = this.position;
            ignoreHead = true;
        } else if (mode == "food") {
            target = this.food;
            ignoreHead = false;
        } else if (mode == "check"){
            ignoreHead = false;
        } else {
            return false;
        }

        // check body collision
        let i = 0;
        if (ignoreHead)
            i = 1;
        for (; i < this.length; i++) {
            if (target.equals(this.bodyList[i]))
                return true;
        }

        // check boundary collision
        if (target.x < 0 || target.x > this.boundary[0] ||
            target.y < 0 || target.y > this.boundary[1]) {
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
        while (true) {
            x = Math.floor(Math.random() * this.boundary[0]);
            y = Math.floor(Math.random() * this.boundary[1]);
            this.food = new Vector2(x, y);
            if (!this.isCollided("food"))
                break;
        }
        this.drawRect(this.food, this.foodColor);
    }

    drawRect(body, color) {
        let x = body.toWorldX();
        let y = body.toWorldY();
        if (color == "clear") {
            this.ctx.clearRect(x, y, this.rectWidth, this.rectHeight);
        } else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, this.rectWidth, this.rectHeight);
        }
    }
}