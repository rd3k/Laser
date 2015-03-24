module rd3k.Laser {

    export class Rectangle {

        public get topLeft(): Vector2 {

            return new Vector2();

        }

        public get topRight(): Vector2 {

            return new Vector2();

        }

        public get bottomLeft(): Vector2 {

            return new Vector2();

        }

        public get bottomRight(): Vector2 {

            return new Vector2();

        }

        public get centre(): Vector2 {

            return new Vector2();

        }

        public get width(): number {

            return 0;

        }

        public get height(): number {

            return 0;

        }

        constructor(private x: number, private y: number, width: number, height: number) {}

    }

}