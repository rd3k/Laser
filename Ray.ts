module rd3k.Laser {

    export class Ray {

        private _colour: string;

        constructor(public source: Object, public from: Vector2, public to: Vector2) {}

        public update(): void {}

        public draw(): void {}

    }

}