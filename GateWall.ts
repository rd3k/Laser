module rd3k.Laser {

    export class GateWall extends Wall {

        constructor(bounds: Rectangle, public colour: string) {

            super(bounds);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [];

        }

        public draw(renderer: IRenderer): void {

            renderer.renderGateWall(this);

        }

    }

}