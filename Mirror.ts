module rd3k.Laser {

    export class Mirror implements ICollidable, IRotatable {

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

            return false;

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return null;

        }

        public reflect(inVector: Vector2): Vector2 {

            return null;

        }

        public update(): void {}

        public draw(): void {}

    }

}