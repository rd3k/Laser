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
            this._direction = Vector2.fromAngle(Util.toRadians(value));

        }

        public get direction(): Vector2 {

            return this._direction;

        }

        public get scene(): Scene {

            return this._scene;

        }

        constructor(private _scene: Scene, public position: Vector2, public colour: string, angle: number = 0) {

            this.angle = angle;
            this.laser = new Laser(this);

        }

        public invalidate(): void {

            this.laser.calculateRays(this._scene.collidables);

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            this.laser.draw(renderer);
            renderer.renderEmitter(this);

        }

    }

}