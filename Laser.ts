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
                rayFar: Vector2,
                intersection: Vector2 = new Vector2(),
                closestIntersection: Vector2,
                closestDistance: number,
                closest: ICollidable,
                obj: ICollidable,
                newRays: Array<Ray>,
                i: number;

            this._rays.length = 0;
            toProcess.push(new Ray(this, this._emitter.position, this._emitter.direction, this.colour));

            while (toProcess.length > 0 && this._rays.length < Laser._maxBounces) {

                ray = toProcess.shift();
                rayFar = new Vector2(ray.from.x + ray.rayVector.x * Laser._longBeam, ray.from.y + ray.rayVector.y * Laser._longBeam);
                closestDistance = 0;
                closestIntersection = new Vector2();
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

                    ray.to = rayFar;

                } else {

                    ray.to = closestIntersection;

                    newRays = closest.getRays(ray);
                    i = newRays.length;

                    while (i--) {
                        toProcess.push(newRays[i]);
                    }

                }

                this._rays.push(ray);

            }

        }

        public draw(renderer: IRenderer): void {

            this._rays.forEach(renderer.renderRay.bind(renderer));

        }

    }

}