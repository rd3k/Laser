module rd3k.Laser {

    export class Scene {

        private _objects: Array<IGameObject>;
        private _emitters: Array<Emitter>;
        private _targets: Array<Target>;
        private _renderer: IRenderer;
        private _mouse: IMouseState;
        private _mouseScrollTimeout: number;
        private _over: ISelectable;
        private _dragging: IMovable;

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

        public get selectables(): Array<ISelectable> {

            var i = this._objects.length,
                coll: Array<ISelectable> = [];

            while (i--) {
                if (typeof (<ISelectable>this._objects[i]).isMouseOver === "function") {
                    coll.push(<ISelectable>this._objects[i]);
                }
            }

            return coll;

        }

        constructor(renderer: IRenderer) {

            this._objects = [];
            this._emitters = [];
            this._targets = [];
            this._renderer = renderer;
            this._mouse = {
                over: false,
                down: false,
                x: -1,
                y: -1,
                scrollY: 0
            };
            this._mouseScrollTimeout = null;
            this._over = null;
            this._dragging = null;

            this.addObjects(
                new Wall(new Rectangle(0, 0, renderer.element.clientWidth, 1)),
                new Wall(new Rectangle(0, renderer.element.clientHeight - 1, renderer.element.clientWidth, 1)),
                new Wall(new Rectangle(0, 0, 1, renderer.element.clientHeight)),
                new Wall(new Rectangle(renderer.element.clientWidth - 1, 0, 1, renderer.element.clientHeight))
            );

            this._addEvents();

        }

        public addObject(object: IGameObject): void {

            if (object instanceof Emitter) {

                object.scene = this;
                this._emitters.push(object);
                this._objects.unshift(object);

            } else {

                if (object instanceof Target) {

                    this._targets.push(object);

                }

                this._objects.push(object);

            }

        }

        public addObjects(...objects: Array<IGameObject>): void {

            var i: number = objects.length;

            while (i--) {
                this.addObject(objects[i]);
            }

        }

        public invalidate(): void {

            var i: number = this._targets.length;

            while (i--) {
                this._targets[i].invalidate();
            }

            i = this._emitters.length;

            while (i--) {
                this._emitters[i].invalidate();
            }

        }

        public update(): void {

            var selectables: Array<ISelectable> = this.selectables;
            var i: number = selectables.length;
            var over: ISelectable = null;
            var shouldInvalidate: boolean = false;

            while (i--) {
                if (this.selectables[i].isMouseOver(this._mouse.x, this._mouse.y)) {
                    over = this.selectables[i];
                    break;
                }
            }

            if (this._over !== null) {
                this._over.selected = false;
            }

            // Stop drag
            if (!this._mouse.down || !this._mouse.over) {
                if (this._dragging) {
                    shouldInvalidate = true;
                }
                this._dragging = null;
            }

            if (over !== null) {

                this._over = over;
                over.selected = true;

                // Start drag
                if (this._dragging === null && this._mouse.down) {
                    this._dragging = <IMovable><IGameObject>over;
                }

                // Mouse wheel rotation
                if (this._mouse.scrollY !== 0 && typeof (<IRotatable><IGameObject>over).angle !== "undefined") {
                    (<IRotatable><IGameObject>over).angle += this._mouse.scrollY / 2;
                    shouldInvalidate = true;
                }

            }

            if (this._dragging !== null) {
                this._dragging.moveTo(this._mouse.x, this._mouse.y);
                shouldInvalidate = true;
            }

            if (shouldInvalidate) {
                this.invalidate();
            }

            i = this._objects.length;

            while (i--) {
                this._objects[i].update();
            }

        }

        public draw(): void {

            var i: number = this._objects.length;

            renderer.clear();

            while (i--) {
                this._objects[i].draw(this._renderer);
            }

        }

        private _addEvents(): void {

            var el: HTMLElement = this._renderer.element;

            el.addEventListener("mousemove", (e: MouseEvent) => {

                this._mouse.over = true;
                this._mouse.x = e.offsetX;
                this._mouse.y = e.offsetY;

            });

            el.addEventListener("mouseleave", (e: MouseEvent) => {

                this._mouse.over = false;
                this._mouse.x = -1;
                this._mouse.y = -1;

            });

            el.addEventListener("mousedown", (e: MouseEvent) => {

                this._mouse.down = true;

            });

            el.addEventListener("mouseup", (e: MouseEvent) => {

                this._mouse.down = false;

            });

            el.addEventListener("mousewheel", (e: WheelEvent) => {

                clearTimeout(this._mouseScrollTimeout);

                if (e.deltaY > 0) {

                    this._mouse.scrollY = 1;

                } else if (e.deltaY < 0) {

                    this._mouse.scrollY = -1;

                }

                this._mouseScrollTimeout = setTimeout(() => {

                    this._mouseScrollTimeout = null;
                    this._mouse.scrollY = 0;

                }, 100);

                e.preventDefault();

            });

        }

    }

}