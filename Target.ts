module rd3k.Laser {

    export class Target implements IGameObject, ICollidable {

        private _radius: number;
        private _hit: boolean;

        public get hit(): boolean {

            return this._hit;

        }

        constructor(public position: Vector2) {

            this._radius = 10;
            this._hit = false;

        }

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            return Vector2.getCircleIntersection(inA, inB, this.position, this._radius, outVector);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            this._hit = true;
            return [Ray.create(this, sourceRay.colour, sourceRay.to, sourceRay.rayVector)];

        }

        public invalidate(): void {

            this._hit = false;

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderTarget(this);

        }

        public dispose(): void {}

    }

}