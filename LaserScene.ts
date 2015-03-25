module rd3k.Laser {

    export class Scene {

        private _objects: Array<IGameObject>;
        private _emitters: Array<Emitter>;
        private _renderer: IRenderer;

        public get collidables(): Array<ICollidable> {

            var i = this._objects.length,
                coll: Array<ICollidable> = [];

            while (i--) {
                if (typeof (<ICollidable>this._objects[i]).getRays === "function") {
                    coll.push(<ICollidable>this._objects[i]);
                }
            }

            return coll;

        }

        constructor(renderer: IRenderer) {

            this._objects = [];
            this._emitters = [];
            this._renderer = renderer;

        }

        public addObject(object: IGameObject): void {

            if (object instanceof Emitter) {
                object.scene = this;
                this._emitters.push(object);
            }

            this._objects.push(object);

        }

        public invalidate(): void {

            var i = this._emitters.length;

            while (i--) {
                this._emitters[i].invalidate();
            }

        }

        public update(): void {

            var i = this._objects.length;

            while (i--) {
                this._objects[i].update();
            }

        }

        public draw(): void {

            var i = this._objects.length;

            while (i--) {
                this._objects[i].draw(this._renderer);
            }

        }
    }

}