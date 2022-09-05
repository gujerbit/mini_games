export default class Vector {

    x:number;
    y:number;
    z:number;

    constructor (x:number, y:number, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add (vector:Vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;

        return this;
    }

    sub (vector:Vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;

        return this;
    }

    mul (n:number) {
        this.x *= n;
        this.y *= n;
        this.z *= n;

        return this;
    }

    div (n:number) {
        this.x /= n;
        this.y /= n;
        this.z /= n;

        return this;
    }

    mag () {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize () {
        if (this.mag() === 0) {
            return;
        }

        this.div(this.mag());
    }

}