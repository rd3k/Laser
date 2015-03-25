module rd3k.Laser {

    export class Filter implements IGameObject, ICollidable {

        private _width: number;
        private _a: Vector2;
        private _b: Vector2;
        private _angle: number;

        public get a(): Vector2 {

            return new Vector2();

        }

        public get b(): Vector2 {

            return new Vector2();

        }

        public get angle(): number {

            return this._angle;

        }

        public set angle(value: number) {

            this._angle = value;
            this._a = new Vector2(-this._width / 2, 0).rotate(Util.toRadians(value));
            this._a.x += this.position.x;
            this._a.y += this.position.y;

        }

        constructor(public position: Vector2, angle: number, public colour: string) {

            this.angle = angle;

        }

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            return Vector2.getVectorIntersection(inA, inB, this.a, this.b, outVector);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [new Ray(this, sourceRay.to, sourceRay.rayVector, this.colour)];

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderFilter(this);

        }

    }

}