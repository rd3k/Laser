module rd3k.Laser {

    export class Scene {

        private _objects: Array<IGameObject>;
        private _renderer: IRenderer;

        constructor(renderer: IRenderer) {

            this._renderer = renderer;

        }

        public addObject(object: IGameObject) {

            this._objects.push(object);

        }

        public update() {

            var i = this._objects.length;
            while (i--) {
                this._objects[i].update();
            }

        }

        public draw() {

            var i = this._objects.length;
            while (i--) {
                this._objects[i].draw(this._renderer);
            }

        }
    }

}