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
        private _keyUps: Array<KeyboardEvent>;

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
            this._keyUps = [];

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

        public removeObject(object: IGameObject): void {

            if (object instanceof Emitter) {
                this._emitters.splice(this._emitters.indexOf(object), 1);
            } else if (object instanceof Target) {
                this._targets.splice(this._targets.indexOf(object), 1);
            }

            this._objects.splice(this._objects.indexOf(object), 1);

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
            var keyUpCode: number = -1;

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

            // Key up
            if (this._keyUps.length > 0) {
                keyUpCode = this._keyUps.pop().keyCode;
            }

            if (over === null) {

                this._over = null;

                switch (keyUpCode) {
                    case KeyboardKey.E:
                        this.addObject(new Emitter(this, new Vector2(this._mouse.x, this._mouse.y), "red", -90));
                        shouldInvalidate = true;
                        break;
                    case KeyboardKey.M:
                        this.addObject(new Mirror(new Vector2(this._mouse.x, this._mouse.y)));
                        shouldInvalidate = true;
                        break;
                    case KeyboardKey.F:
                        this.addObject(new Filter(new Vector2(this._mouse.x, this._mouse.y), "red"));
                        shouldInvalidate = true;
                        break;
                    case KeyboardKey.S:
                        this.addObject(new Splitter(new Vector2(this._mouse.x, this._mouse.y)));
                        shouldInvalidate = true;
                        break;
                    case (keyUpCode > 0 ? keyUpCode : null):
                        // console.log(keyUpCode);
                }

            } else {

                this._over = over;
                over.selected = true;

                // Start drag
                if (this._dragging === null && this._mouse.down && typeof (<IMovable><IGameObject>over).moveTo === "function") {
                    this._dragging = <IMovable><IGameObject>over;
                }

                // Rotation
                if (typeof (<IRotatable><IGameObject>over).angle !== "undefined") {
                    if (this._mouse.scrollY !== 0) {
                        (<IRotatable><IGameObject>over).angle += this._mouse.scrollY / 2;
                        shouldInvalidate = true;
                    } else if (keyUpCode === KeyboardKey.Up || keyUpCode === KeyboardKey.Left) {
                        (<IRotatable><IGameObject>over).angle--;
                        shouldInvalidate = true;
                    } else if (keyUpCode === KeyboardKey.Down || keyUpCode === KeyboardKey.Right) {
                        (<IRotatable><IGameObject>over).angle++;
                        shouldInvalidate = true;
                    }
                }

                // Delete
                if (keyUpCode === KeyboardKey.Backspace) {
                    this._over = null;
                    over.dispose();
                    this.removeObject(over);
                    shouldInvalidate = true;
                }

            }

            // Dragging
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

            el.addEventListener("mouseover", this._onMouseOver);
            el.addEventListener("mousemove", this._onMouseMove.bind(this));
            el.addEventListener("mouseleave", this._onMouseLeave.bind(this));
            el.addEventListener("mousedown", this._onMouseDown.bind(this));
            el.addEventListener("mouseup", this._onMouseUp.bind(this));
            el.addEventListener("mousewheel", this._onMouseWheel.bind(this));
            el.addEventListener("keydown", this._onKeyDown);
            el.addEventListener("keyup", this._onKeyUp.bind(this));
            el.addEventListener("contextmenu", this._onContextMenu.bind(this));

        }

        private _onMouseOver(e: MouseEvent): boolean {

            (<HTMLElement>e.target).focus();
            return false;

        }

        private _onMouseMove(e: MouseEvent): void {

            this._mouse.over = true;
            this._mouse.x = e.offsetX;
            this._mouse.y = e.offsetY;

        }

        private _onMouseLeave(e: MouseEvent): boolean {

            this._mouse.over = false;
            this._mouse.down = false;
            this._mouse.x = -1;
            this._mouse.y = -1;
            (<HTMLElement>e.target).blur();
            return false;

        }

        private _onMouseDown(e: MouseEvent): void {

            if (e.button === 0) {
                this._mouse.down = true;
                GUI.hideTweaker();
            }

        }

        private _onMouseUp(e: MouseEvent): void {

            if (e.button === 0) {
                this._mouse.down = false;
            }

        }

        private _onMouseWheel(e: WheelEvent): void {

            clearTimeout(this._mouseScrollTimeout);

            if (e.deltaY > 0) {
                this._mouse.scrollY = 1;
            } else if (e.deltaY < 0) {
                this._mouse.scrollY = -1;
            }

            this._mouseScrollTimeout = setTimeout(this._onMouseScrollEnd.bind(this), 100);
            e.preventDefault();

        }

        private _onMouseScrollEnd(): void {

            this._mouseScrollTimeout = null;
            this._mouse.scrollY = 0;

        }

        private _onKeyDown(e: KeyboardEvent): void {

            if (e.keyCode === KeyboardKey.Backspace) {
                e.preventDefault();
            }

        }

        private _onKeyUp(e: KeyboardEvent): void {

            this._keyUps.unshift(e);

        }

        private _onContextMenu(e: MouseEvent): boolean {

            if (this._over !== null) {
                GUI.showTweaker((<any>this._over).position.x, (<any>this._over).position.y, this._over);
            }

            e.preventDefault();
            return false;

        }

    }

}