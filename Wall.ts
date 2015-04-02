module rd3k.Laser {

    export class Wall implements IGameObject, ICollidable {

        constructor(public bounds: Rectangle) {}

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            var intersection = new Vector2();

            if ((Vector2.getVectorIntersection(inA, inB, this.bounds.topLeft, this.bounds.topRight, intersection) && intersection.y > inA.y) ||
            (Vector2.getVectorIntersection(inA, inB, this.bounds.bottomLeft, this.bounds.bottomRight, intersection) && intersection.y < inA.y) ||
            (Vector2.getVectorIntersection(inA, inB, this.bounds.topLeft, this.bounds.bottomLeft, intersection) && intersection.x > inA.x) ||
            (Vector2.getVectorIntersection(inA, inB, this.bounds.topRight, this.bounds.bottomRight, intersection) && intersection.x < inA.x)) {

                outVector.x = intersection.x;
                outVector.y = intersection.y;
                return true;

            }

            if (this.bounds.containsPoint(inA.x, inA.y)) {

                outVector.x = inA.x;
                outVector.y = inA.y;
                return true;

            }

            return false;

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [];

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderWall(this);

        }

    }

}