module rd3k.Laser {

    export class Filter implements IGameObject, ICollidable, IMovable, IRotatable, ISelectable {

        private _a: Vector2;
        private _b: Vector2;
        private _angle: number;

        public selected: boolean;

        public get a(): Vector2 {

            return this._a;

        }

        public get b(): Vector2 {

            return this._b;

        }

        public get angle(): number {

            return this._angle;

        }

        public get width(): number {

            return this._width;

        }

        public set angle(value: number) {

            this._angle = value;
            this._a = new Vector2(-this._width / 2, 0).rotate(Util.toRadians(value));
            this._a.x += this.position.x;
            this._a.y += this.position.y;
            this._b = new Vector2(this._width / 2, 0).rotate(Util.toRadians(value));
            this._b.x += this.position.x;
            this._b.y += this.position.y;

        }

        constructor(public position: Vector2, public colour: string, angle: number = 0, private _width = 40) {

            this.angle = angle;
            this.selected = false;

        }

        public moveTo(x: number, y: number) {

            this._a.x += (x - this.position.x);
            this._b.x += (x - this.position.x);
            this._a.y += (y - this.position.y);
            this._b.y += (y - this.position.y);
            this.position.x = x;
            this.position.y = y;

        }

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            return Vector2.getVectorIntersection(inA, inB, this.a, this.b, outVector);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [Ray.create(this, this.colour, sourceRay.to, sourceRay.rayVector)];

        }

        public isMouseOver(x: number, y: number): boolean {

            return Util.isPointInCircle(x, y, this.position.x, this.position.y, this._width / 2);

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderFilter(this);

        }

    }

}