module rd3k.Laser {

    export class Target implements ICollidable {

        public hit: boolean;

        constructor(public position: Vector2) {}

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            outVector = new Vector2();
            return false;

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [];

        }

        public update(): void {}

        public draw(): void {}

    }

}