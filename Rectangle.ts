module rd3k.Laser {

    export class Rectangle {

        private _topLeft: Vector2;
        private _topRight: Vector2;
        private _bottomLeft: Vector2;
        private _bottomRight: Vector2;

        public get topLeft(): Vector2 {

            return this._topLeft;

        }

        public get topRight(): Vector2 {

            return this._topRight;

        }

        public get bottomLeft(): Vector2 {

            return this._bottomLeft;

        }

        public get bottomRight(): Vector2 {

            return this._bottomRight;

        }

        public get width(): number {

            return this._topRight.x - this._topLeft.x;

        }

        public get height(): number {

            return this._bottomLeft.y - this._topLeft.y;

        }

        constructor(private x: number, private y: number, width: number, height: number) {

            this._topLeft = new Vector2(x, y);
            this._topRight = new Vector2(x + width, y);
            this._bottomLeft = new Vector2(x, y + height);
            this._bottomRight = new Vector2(x + width, y + height);

        }

    }

}