module rd3k.Laser {

    export class RayHit implements IGameObject {

        private static _poolIndex: number;
        private static _pool: Array<RayHit> = [];

        public static usePool: boolean = false;

        public static resetPool(): void {

            RayHit._poolIndex = 0;

        }

        public static createPool(quantity: number): void {

            while (quantity--) {
                RayHit._pool.push(new RayHit(new Vector2(), null));
            }

            RayHit._poolIndex = 0;
            RayHit.usePool = true;

        }

        public static create(position: Vector2, colour: string): RayHit {

            var rayHit: RayHit;

            if (RayHit.usePool && RayHit._poolIndex < RayHit._pool.length) {

                rayHit = RayHit._pool[RayHit._poolIndex++];
                rayHit.position = position;
                rayHit.colour = colour;

            } else {

                rayHit = new RayHit(position, colour);

            }

            return rayHit;

        }

        constructor(public position: Vector2, public colour: string) {}

        public update(): void {}

        public draw(renderer: IRenderer): void {

            renderer.renderRayHit(this);

        }

    }

} 