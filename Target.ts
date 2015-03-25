module rd3k.Laser {

    export class Target implements IGameObject, ICollidable {

        private _radius = 10;

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

        public draw(renderer: IRenderer): void {

            renderer.renderTarget(this);

        }

    }

}