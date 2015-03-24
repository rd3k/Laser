module rd3k.Laser {

    export class Wall implements ICollidable {

        public colour: string;

        constructor(public bounds: Rectangle) {}

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