module rd3k.Laser {

    export class Splitter extends Mirror implements IGameObject {

        constructor(public position: Vector2, public angle: number) {

            super(position, angle);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [
                new Ray(this, sourceRay.to, sourceRay.rayVector.reflect(this.normal), sourceRay.colour),
                new Ray(this, sourceRay.to, sourceRay.rayVector, sourceRay.colour)
            ];

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderSplitter(this);

        }

    }

}