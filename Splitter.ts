module rd3k.Laser {

    export class Splitter extends Mirror {

        constructor(public position: Vector2, public angle: number) {

            super(position, angle);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [];

        }

        public update(): void {}

        public draw(): void {}

    }

}