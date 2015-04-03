module rd3k.Laser {

    export class Ray implements IGameObject {

        private static _poolIndex: number;
        private static _pool: Array<Ray> = [];

        public static usePool: boolean = false;

        public static resetPool(): void {

            Ray._poolIndex = 0;

        }

        public static createPool(quantity: number): void {

            while (quantity--) {
                Ray._pool.push(new Ray(null, null, new Vector2(), new Vector2()));
            }

            Ray._poolIndex = 0;
            Ray.usePool = true;

        }

        public static create(source: Object, colour: string, from: Vector2, rayVector: Vector2): Ray {

            var ray: Ray;

            if (Ray.usePool && Ray._poolIndex < Ray._pool.length) {

                ray = Ray._pool[Ray._poolIndex++];
                ray.source = source;
                ray.colour = colour;
                ray.from = from;
                ray.rayVector = rayVector;

            } else {

                ray = new Ray(source, colour, from, rayVector);

            }

            return ray;

        }

        public to: Vector2;

        constructor(public source: Object, public colour: string, public from: Vector2, public rayVector: Vector2) {

            this.to = new Vector2(from.x + rayVector.x, from.y + rayVector.y);

        }

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderRay(this);

        }

        public dispose(): void {}

    }

}