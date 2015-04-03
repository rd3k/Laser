module rd3k.Laser {

    export class Vector2 {

        private static _poolIndex: number;
        private static _pool: Array<Vector2> = [];
        private static _usePool: boolean = false;

        public get length(): number {

            return Math.sqrt((this.x * this.x) + (this.y * this.y));

        }

        constructor(public x: number = 0, public y: number = 0) {}

        public static resetPool(): void {

            Vector2._poolIndex = 0;

        }

        public static createPool(quantity: number): void {

            while (quantity--) {
                Vector2._pool.push(new Vector2());
            }

            Vector2._poolIndex = 0;
            Vector2._usePool = true;

        }

        public static create(x: number = 0, y: number = 0): Vector2 {

            var vec: Vector2;

            if (Vector2._usePool && Vector2._poolIndex < Vector2._pool.length) {

                vec = Vector2._pool[Vector2._poolIndex++];
                vec.x = x;
                vec.y = y;

            } else {

                vec = new Vector2(x, y);

            }

            return vec;

        }

        public dot(other: Vector2): number {

            return (this.x * other.x) + (this.y * other.y);

        }

        public rotate(radians: number): Vector2 {

            var cos: number = Math.cos(radians),
                sin: number = Math.sin(radians);

            return new Vector2((this.x * cos) - (this.y * sin), (this.x * sin) + (this.y * cos));

        }

        public rotateSelf(radians: number): Vector2 {

            var cos: number = Math.cos(radians),
                sin: number = Math.sin(radians),
                x: number = (this.x * cos) - (this.y * sin),
                y: number = (this.x * sin) + (this.y * cos);

            this.x = x;
            this.y = y;

            return this;

        }

        public reflect(normal: Vector2): Vector2 {

            var i: number = 2 * this.dot(normal);
            return new Vector2(this.x - (i * normal.x), this.y - (i * normal.y));

        }

        public static getVectorIntersection(v0p0: Vector2, v0p1: Vector2, v1p0: Vector2, v1p1: Vector2, outIntersection: Vector2): boolean {

            var s1x: number = v0p1.x - v0p0.x,
                s1y: number = v0p1.y - v0p0.y,
                s2x: number = v1p1.x - v1p0.x,
                s2y: number = v1p1.y - v1p0.y,
                s: number = (-s1y * (v0p0.x - v1p0.x) + s1x * (v0p0.y - v1p0.y)) / (-s2x * s1y + s1x * s2y),
                t: number = (s2x * (v0p0.y - v1p0.y) - s2y * (v0p0.x - v1p0.x)) / (-s2x * s1y + s1x * s2y);

            if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {

                outIntersection.x = v0p0.x + (t * s1x);
                outIntersection.y = v0p0.y + (t * s1y);
                return true;

            } else {

                return false;

            }

        }

        public static getCircleIntersection(v0: Vector2, v1: Vector2, cPosition: Vector2, cRadius: number, outIntersection: Vector2): boolean {

            var dx: number = v1.x - v0.x,
                dy: number = v1.y - v0.y,
                a: number = dx * dx + dy * dy,
                b: number = 2 * (dx * (v0.x - cPosition.x) + dy * (v0.y - cPosition.y)),
                c: number = (v0.x - cPosition.x) * (v0.x - cPosition.x) + (v0.y - cPosition.y) * (v0.y - cPosition.y) - cRadius * cRadius,
                det: number = b * b - 4 * a * c,
                t: number = -b / (2 * a),
                t0: number, t1: number,
                i1x: number, i1y: number,
                i2x: number, i2y: number,
                d1: number, d2: number;

            if (a <= 0.0000001 || det < 0) {

                // No real solutions
                return false;

            }

            if (det === 0) {

                // One solution
                if (0 <= t && t <= 1) {

                    outIntersection.x = v0.x + t * dx;
                    outIntersection.y = v0.y + t * dy;
                    return true;

                }

                return false;

            }

            t0 = (-b + Math.sqrt(det)) / (2 * a);
            t1 = (-b - Math.sqrt(det)) / (2 * a);

            if (!(0 <= t0 && t0 <= 1) && !(0 <= t1 && t1 <= 1)) {

                return false;

            }

            // Two solutions
            i1x = v0.x + t0 * dx;
            i1y = v0.y + t0 * dy;
            i2x = v0.x + t1 * dx;
            i2y = v0.y + t1 * dy;
            d1 = Math.sqrt(((i1x - v0.x) * (i1x - v0.x)) + ((i1y - v0.y) * (i1y - v0.y)));
            d2 = Math.sqrt(((i2x - v0.x) * (i2x - v0.x)) + ((i2y - v0.y) * (i2y - v0.y)));

            if (d1 < d2) {

                outIntersection.x = i1x;
                outIntersection.y = i1y;

            } else {

                outIntersection.x = i2x;
                outIntersection.y = i2y;

            }

            return true;

        }

    }

}