module rd3k.Laser {

    export class Emitter implements IGameObject {

        private _direction: Vector2;
        private _angle: number;

        public laser: Laser;

        public get angle() {

            return this._angle;

        }

        public set angle(value: number) {

            this._angle = value;

        }

        public get direction(): Vector2 {

            return this._direction;

        }

        constructor(public position: Vector2, public colour: string, angle: number = 0) {}

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderEmitter(this);

        }

    }

}