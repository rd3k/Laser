module rd3k.Laser {

    export class AB {

        protected _a: Vector2;
        protected _b: Vector2;
        protected _angle: number;
        protected _normal: Vector2;

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

        public get normal(): Vector2 {

            return this._normal;

        }

        public set angle(value: number) {

            var radians: number = Util.toRadians(value);

            this._angle = value;
            this._normal.x = Math.cos(radians - (Math.PI / 2));
            this._normal.y = Math.sin(radians - (Math.PI / 2));
            this._a.x = -this._width / 2;
            this._a.y = 0;
            this._a.rotateSelf(radians);
            this._a.x += this.position.x;
            this._a.y += this.position.y;
            this._b.x = this._width / 2;
            this._b.y = 0;
            this._b.rotateSelf(radians);
            this._b.x += this.position.x;
            this._b.y += this.position.y;

        }

        constructor(public position: Vector2, angle: number, protected _width: number) {

            this._a = new Vector2();
            this._b = new Vector2();
            this._normal = new Vector2();
            this.angle = angle;

        }

        public moveTo(x: number, y: number) {

            this._a.x += (x - this.position.x);
            this._b.x += (x - this.position.x);
            this._a.y += (y - this.position.y);
            this._b.y += (y - this.position.y);
            this.position.x = x;
            this.position.y = y;

        }

    }

} 