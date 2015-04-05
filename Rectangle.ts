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

        public get position(): Vector2 {

            return Vector2.create(this.topLeft.x + (this.width / 2), this.topLeft.y + (this.height / 2));

        }

        public set top(value: number) {

            this.topLeft.y = value;
            this.topRight.y = value;

        }

        public set bottom(value: number) {

            this.bottomLeft.y = value;
            this.bottomRight.y = value;

        }

        public set left(value: number) {

            this.topLeft.x = value;
            this.bottomLeft.x = value;

        }

        public set right(value: number) {

            this.topRight.x = value;
            this.bottomRight.x = value;

        }

        constructor(x: number, y: number, width: number, height: number) {

            this._topLeft = new Vector2(x, y);
            this._topRight = new Vector2(x + width, y);
            this._bottomLeft = new Vector2(x, y + height);
            this._bottomRight = new Vector2(x + width, y + height);

        }

        public containsPoint(x: number, y: number) {

            return (x >= this.topLeft.x && y >= this.topLeft.y && x < this.topRight.x && y < this.bottomRight.y);

        }

        public moveTo(x: number, y: number): void {

            var xDiff = x - this.topLeft.x - this.width / 2;
            var yDiff = y - this.topLeft.y - this.height / 2;
            var left = this.topLeft.x + xDiff;
            var right = this.topRight.x + xDiff;
            var top = this.topLeft.y + yDiff;
            var bottom = this.bottomRight.y + yDiff;

            this.top = top;
            this.bottom = bottom;
            this.left = left;
            this.right = right;

        }

    }

}