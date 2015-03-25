module rd3k.Laser {

    export class Ray implements IGameObject {

        public get colour() {

            return this._colour;

        }

        public to: Vector2;

        constructor(public source: Object, public from: Vector2, public rayVector: Vector2, private _colour: string) {

            this.to = new Vector2(from.x + rayVector.x, from.y + rayVector.y);

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderRay(this);

        }

    }

}