module rd3k.Laser {

    export class Splitter extends Mirror implements IGameObject {

        constructor(public position: Vector2, public angle: number) {

            super(position, angle);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [
                Ray.create(this, sourceRay.colour, sourceRay.to, sourceRay.rayVector.reflect(this.normal)),
                Ray.create(this, sourceRay.colour, sourceRay.to, sourceRay.rayVector)
            ];

        }

        public isMouseOver(x: number, y: number): boolean {

            return Util.isPointInCircle(x, y, this.position.x, this.position.y, this.width * Math.cos(Math.PI / 4));

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderSplitter(this);

        }

    }

}