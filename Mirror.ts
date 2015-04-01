module rd3k.Laser {

    export class Mirror implements IGameObject, ICollidable, IMovable, IRotatable, ISelectable {

        private _a: Vector2;
        private _b: Vector2;
        private _angle: number;
        private _normal: Vector2;

        public selected: boolean;

        public get normal(): Vector2 {

            return this._normal;

        }

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

            var radians: number = Util.toRadians(value);

            this._angle = value;
            this._normal = Vector2.fromAngle(radians - (Math.PI / 2));
            this._a = new Vector2(-this._width / 2, 0).rotate(radians);
            this._a.x += this.position.x;
            this._a.y += this.position.y;
            this._b = new Vector2(this._width / 2, 0).rotate(radians);
            this._b.x += this.position.x;
            this._b.y += this.position.y;

        }

        constructor(public position: Vector2, angle: number = 0, private _width = 40) {

            this.angle = angle;
            this.selected = false;

        }

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            return Vector2.getVectorIntersection(inA, inB, this.a, this.b, outVector);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [Ray.create(this, sourceRay.colour, sourceRay.to, sourceRay.rayVector.reflect(this.normal))];

        }

        public isMouseOver(x: number, y: number): boolean {

            return Util.isPointInCircle(x, y, this.position.x, this.position.y, this._width / 2);

        }

        public update(): void {

            this.angle += 0.2;

        }

        public draw(renderer: IRenderer): void {

            renderer.renderMirror(this);

        }

    }

}