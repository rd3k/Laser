module rd3k.Laser {

    export class Vector2 {

        private static _zero = new Vector2();

        public static get Zero(): Vector2 {
            return Vector2._zero;
        }

        public x: number;
        public y: number;

        public get length(): number {

            return 0;

        }

        constructor() {}

        public static fromAngle(radians: number): Vector2 {

            return new Vector2();

        }

        public dot(other: Vector2): number {

            return 0;

        }

        public rotate(radians: number): Vector2 {

            return new Vector2();

        }

        public reflect(normal: Vector2): Vector2 {

            return new Vector2();

        }

        public getIntersection(other: Vector2, outIntersection: Vector2): boolean {

            outIntersection = new Vector2();
            return false;

        }

    }

}