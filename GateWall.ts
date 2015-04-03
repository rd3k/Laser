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

        public toJSON(): IGameObjectJSON {

            return {
                type: "gatewall",
                x: this.bounds.topLeft.x,
                y: this.bounds.topLeft.y,
                width: this.bounds.width,
                height: this.bounds.height,
                colour: this.colour
            };

        }

    }

}