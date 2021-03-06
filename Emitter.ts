module rd3k.Laser {

    export class Emitter implements IGameObject, ICollidable, IRotatable, IMovable, ISelectable {

        private _direction: Vector2;
        private _angle: number;
        private _width: number;

        public laser: Laser;
        public selected: boolean;

        public get angle() {

            return this._angle;

        }

        public set angle(value: number) {

            var radians = Util.toRadians(value);

            this._angle = value;
            this._direction.x = Math.cos(radians);
            this._direction.y = Math.sin(radians);

        }

        public get direction(): Vector2 {

            return this._direction;

        }

        public get width(): number {

            return this._width;

        }

        public get scene(): Scene {

            return this._scene;

        }

        constructor(private _scene: Scene, public position: Vector2, public colour: string, angle: number = 0) {

            this._direction = new Vector2();
            this.angle = angle;
            this.laser = new Laser(this);
            this.selected = false;
            this._width = 20;

        }

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            return Vector2.getCircleIntersection(inA, inB, this.position, this._width / 2, outVector);

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return null;

        }

        public moveTo(x: number, y: number) {

            this.position.x = x;
            this.position.y = y;

        }

        public invalidate(): void {

            this.laser.calculateRays(this._scene.collidables);

        }

        public isMouseOver(x: number, y: number): boolean {

            return Util.isPointInCircle(x, y, this.position.x, this.position.y, this._width / 2);

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderEmitter(this);
            this.laser.draw(renderer);

        }

        public dispose(): void {

            this.laser.dispose();

        }

        public toJSON(): IGameObjectJSON {

            return {
                type: "emitter",
                position: this.position,
                colour: this.colour,
                angle: this.angle
            };

        }

    }

}