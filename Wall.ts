module rd3k.Laser {

    export class Wall implements IGameObject, ICollidable, ISelectable, IMovable {

        public selected: boolean;

        public get position(): Vector2 {

            return this.bounds.position;

        }

        constructor(public bounds: Rectangle, public colour: string = "grey") {

            this.selected = false;

        }

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            var intersection = Vector2.create();

            if ((Vector2.getVectorIntersection(inA, inB, this.bounds.topLeft, this.bounds.topRight, intersection) && intersection.y > inA.y) ||
            (Vector2.getVectorIntersection(inA, inB, this.bounds.bottomLeft, this.bounds.bottomRight, intersection) && intersection.y < inA.y) ||
            (Vector2.getVectorIntersection(inA, inB, this.bounds.topLeft, this.bounds.bottomLeft, intersection) && intersection.x > inA.x) ||
            (Vector2.getVectorIntersection(inA, inB, this.bounds.topRight, this.bounds.bottomRight, intersection) && intersection.x < inA.x)) {

                outVector.x = intersection.x;
                outVector.y = intersection.y;
                return true;

            }

            if (this.bounds.containsPoint(inA.x, inA.y)) {

                outVector.x = inA.x;
                outVector.y = inA.y;
                return true;

            }

            return false;

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return sourceRay.colour === this.colour ? [Ray.create(this, sourceRay.colour, sourceRay.to, sourceRay.rayVector)] : null;

        }

        public isMouseOver(x: number, y: number): boolean {

            return this.bounds.containsPoint(x, y);

        }

        public moveTo(x: number, y: number): void {

            this.bounds.moveTo(x, y);

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderWall(this);

        }

        public dispose(): void {}

        public toJSON(): IGameObjectJSON {

            return {
                type: "wall",
                x: this.bounds.topLeft.x,
                y: this.bounds.topLeft.y,
                width: this.bounds.width,
                height: this.bounds.height,
                colour: this.colour
            };

        }

    }

}