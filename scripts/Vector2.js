const worldScale = 30;

// immutable
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(otherVector2) {
        return new Vector2(this.x + otherVector2.x, this.y + otherVector2.y);
    }

    reverse() {
        return new Vector2(this.x * -1, this.y * -1);
    }

    equals(otherVector2) {
        if (this.x == otherVector2.x && this.y == otherVector2.y)
            return true;
        return false;
    }

    toWorldX() {
        return this.x * worldScale;
    }

    toWorldY() {
        return this.y * worldScale;
    }

    toString() {
        return "Vector2 (" + this.x + ", " + this.y + ")";
    }
}

const leftDir = new Vector2(-1, 0);
const rightDir = new Vector2(1, 0);
const upDir = new Vector2(0, -1);
const downDir = new Vector2(0, 1);