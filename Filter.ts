module rd3k.Laser {

    export class Filter implements IGameObject, ICollidable {

        public get a(): Vector2 {

            return new Vector2();

        }

        public get b(): Vector2 {

            return new Vector2();

        }

        constructor(public position: Vector2, private _angle: number, public colour: string) {}

        public getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean {

            outVector = new Vector2();
            return false;

        }

        public getRays(sourceRay: Ray): Array<Ray> {

            return [];

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderFilter(this);

        }

    }

}