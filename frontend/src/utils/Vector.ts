export class Vector {

    private x:number;
    private y:number;
    private z:number;

    constructor (x:number, y:number, z:number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    sum (vector:Vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;

        return this;
    }

    reverse () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;
    }

}