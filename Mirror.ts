module rd3k.Laser {

    export class Mirror implements IGameObject, ICollidable, IRotatable {

        private _angle: number;
        private _a: Vector2;
        private _b: Vector2;

        public get normalAngle(): number {

            return 0;

        }

        public get normal(): Vector2 {

            return new Vector2();

        }

        public get a(): Vector2 {

            return this._a;

        }

        public get b(): Vector2 {

            return this._b;

        }

        constructor(public position: Vector2, public angle: number = 0) {}

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            outVector = new Vector2();
            return false;

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [];

        }

        public reflect(inVector: Vector2): Vector2 {

            return new Vector2();

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderMirror(this);

        }

    }

}