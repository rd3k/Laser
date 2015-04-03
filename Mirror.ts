module rd3k.Laser {

    export class Mirror extends AB implements IGameObject, ICollidable, IMovable, IRotatable, ISelectable {

        public selected: boolean;

        constructor(position: Vector2, angle: number = 0, width = 40) {

            super(position, angle, width);

            this.selected = false;

        }

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            return Vector2.getVectorIntersection(inA, inB, this.a, this.b, outVector);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [Ray.create(this, sourceRay.colour, sourceRay.to, sourceRay.rayVector.reflect(this.normal))];

        }

        public isMouseOver(x: number, y: number): boolean {

            return Util.isPointInCircle(x, y, this.position.x, this.position.y, this._width / 2);

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderMirror(this);

        }

        public dispose(): void {}

    }

}