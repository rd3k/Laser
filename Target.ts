module rd3k.Laser {

    export class Target implements IGameObject, ICollidable {

        private _radius = 10;

        public hit: boolean;

        constructor(public position: Vector2) {}

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            return Vector2.getCircleIntersection(inA, inB, this.position, this._radius, outVector);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [new Ray(this, sourceRay.to, sourceRay.rayVector, sourceRay.colour)];

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderTarget(this);

        }

    }

}