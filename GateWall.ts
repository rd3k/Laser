module rd3k.Laser {

    export class GateWall extends Wall {

        constructor(bounds: Rectangle, public colour: string) {

            super(bounds);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return sourceRay.colour === this.colour ? [new Ray(this, sourceRay.to, sourceRay.rayVector, sourceRay.colour)] : [];

        }

        public draw(renderer: IRenderer): void {

            renderer.renderGateWall(this);

        }

    }

}