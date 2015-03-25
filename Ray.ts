module rd3k.Laser {

    export class Ray implements IGameObject {

        private _colour: string;

        constructor(public source: Object, public from: Vector2, public to: Vector2) {}

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderRay(this);

        }

    }

}