module rd3k.Laser {

    export class Laser {

        private static _maxBounces: number = 64;
        private static _longBeam: number = 4096;

        private _rays: Array<Ray>;

        public get colour(): string {

            return this._emitter.colour;

        }

        constructor(private _emitter: Emitter) {

            this._rays = [];

        }

        public calculateRays(collidables: Array<ICollidable>): void {

            var toProcess: Array<Ray> = [],
                ray: Ray,
                rayFar: Vector2 = new Vector2(),
                intersection: Vector2 = new Vector2(),
                closestIntersection: Vector2 = new Vector2(),
                closestDistance: number,
                closest: ICollidable,
                obj: ICollidable,
                i: number;

            this._rays.length = 0;
            toProcess.push(Ray.create(this, this.colour, this._emitter.position, this._emitter.direction));

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

                        var distance: number = new Vector2(intersection.x - ray.from.x, intersection.y - ray.from.y).length;

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

                    toProcess.push.apply(toProcess, closest.getRays(ray));

                }

                this._rays.push(ray);

            }

        }

        public draw(renderer: IRenderer): void {

            this._rays.forEach(renderer.renderRay.bind(renderer));

        }

    }

}