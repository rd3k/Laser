module rd3k.Laser {

    export class Wall implements IGameObject, ICollidable {

        constructor(public bounds: Rectangle) {}

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            outVector = new Vector2();
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