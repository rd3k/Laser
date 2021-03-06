module rd3k.Laser {

    export class Laser {

        private static _maxBounces: number = 64;
        private static _longBeam: number = 4096;

        private _rays: Array<Ray>;
        private _hits: Array<RayHit>;

        public get colour(): string {

            return this._emitter.colour;

        }

        constructor(private _emitter: Emitter) {

            this._rays = [];
            this._hits = [];

        }

        public calculateRays(collidables: Array<ICollidable>): void {

            var toProcess: Array<Ray> = [],
                ray: Ray,
                rayFar: Vector2 = Vector2.create(),
                intersection: Vector2 = Vector2.create(),
                closestIntersection: Vector2 = Vector2.create(),
                closestDistance: number,
                closest: ICollidable,
                obj: ICollidable,
                newRays: Array<Ray> = null,
                i: number,
                distance: number;

            this._rays.length = 0;
            this._hits.length = 0;
            toProcess.push(Ray.create(this._emitter, this.colour, this._emitter.position, this._emitter.direction));

            while (toProcess.length > 0 && this._rays.length < Laser._maxBounces) {

                ray = toProcess.shift();
                rayFar.x = ray.from.x + ray.rayVector.x * Laser._longBeam;
                rayFar.y = ray.from.y + ray.rayVector.y * Laser._longBeam;
                closestDistance = 0;
                closest = null;
                i = collidables.length;

                while (i--) {

                    obj = collidables[i];

                    if (obj !== ray.source && obj.getIntersection(ray.from, rayFar, intersection)) {

                        distance = Math.sqrt(((intersection.x - ray.from.x) * (intersection.x - ray.from.x)) +
                                             ((intersection.y - ray.from.y) * (intersection.y - ray.from.y)));

                        if (closest !== null && distance > closestDistance) {
                            continue;
                        }

                        closest = obj;
                        closestIntersection.x = intersection.x;
                        closestIntersection.y = intersection.y;
                        closestDistance = distance;

                    }

                }

                if (closest === null) {

                    ray.to.x = rayFar.x;
                    ray.to.y = rayFar.y;

                } else {

                    ray.to.x = closestIntersection.x;
                    ray.to.y = closestIntersection.y;
                    newRays = closest.getRays(ray);

                    if (newRays === null) {
                        this._hits.push(RayHit.create(ray.to, ray.colour));
                    } else {
                        toProcess.push.apply(toProcess, newRays);
                    }

                }

                this._rays.push(ray);

            }

        }

        public draw(renderer: IRenderer): void {

            var i = this._rays.length;

            while (i--) {
                this._rays[i].draw(renderer);
            }

            i = this._hits.length;

            while (i--) {
                this._hits[i].draw(renderer);
            }

        }

        public dispose(): void {

            this._rays.length = 0;
            this._hits.length = 0;

        }

    }

}