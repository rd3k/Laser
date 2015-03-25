module rd3k.Laser {

    export class Splitter extends Mirror implements IGameObject {

        constructor(public position: Vector2, public angle: number) {

            super(position, angle);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [];

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderSplitter(this);

        }

    }

}