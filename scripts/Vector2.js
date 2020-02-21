class Vector2 {
    worldScale = 20;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    add(otherVector2) {
        this.x += otherVector2.x;
        this.y += otherVector2.y;
    }

    createNew(otherVector2) {
        return new Vector2(this.x + otherVector2.x, this.y + otherVector2.y);
    }

    clone() {
        return new Vector2(this.x, this.y);
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
        return this.x * this.worldScale;
    }

    toWorldY() {
        return this.y * this.worldScale;
    }

    toString() {
        return "Vector2 (" + this.x + ", " + this.y + ")";
    }
}