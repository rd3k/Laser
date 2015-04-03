module rd3k.Laser {

    export class GateWall extends Wall {

        constructor(bounds: Rectangle, public colour: string) {

            super(bounds);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return sourceRay.colour === this.colour ? [Ray.create(this, sourceRay.colour, sourceRay.to, sourceRay.rayVector)] : null;

        }

        public draw(renderer: IRenderer): void {

            renderer.renderGateWall(this);

        }

        public dispose(): void {}

    }

}