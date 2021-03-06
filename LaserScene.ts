﻿module rd3k.Laser {

    export class Scene {

        private _objects: Array<IGameObject>;
        private _emitters: Array<Emitter>;
        private _targets: Array<Target>;
        private _selectables: Array<ISelectable>;
        private _renderer: IRenderer;
        private _mouse: IMouseState;
        private _mouseScrollTimeout: number;
        private _over: ISelectable;
        private _dragging: IMovable;
        private _keyUps: Array<KeyboardEvent>;
        private _shiftKey: boolean;
        private _drawing: boolean;
        private _dragOffsetX: number = 0;
        private _dragOffsetY: number = 0;
        private _drawingWall: Wall;
        private _drawingFromX = 0;
        private _drawingFromY = 0;

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

            return this._selectables;

        }

        public get objects(): Array<IGameObject> {

            return this._objects;

        }

        public get renderer(): IRenderer {

            return this._renderer;

        }

        constructor(renderer: IRenderer) {

            this._objects = [];
            this._emitters = [];
            this._targets = [];
            this._selectables = [];
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
            this._shiftKey = false;
            this._drawing = false;
            this._drawingWall = null;

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

            if (typeof (<ISelectable>object).isMouseOver === "function") {
                this._selectables.push(<ISelectable>object);
            }

        }

        public addObjects(...objects: Array<IGameObject>): void {

            var i: number = objects.length;

            while (i--) {
                this.addObject(objects[i]);
            }

        }

        public removeObject(object: IGameObject): void {

            object.dispose();

            if (object instanceof Emitter) {
                this._emitters.splice(this._emitters.indexOf(object), 1);
            } else if (object instanceof Target) {
                this._targets.splice(this._targets.indexOf(object), 1);
            }

            this._objects.splice(this._objects.indexOf(object), 1);

            if (typeof (<ISelectable>object).isMouseOver === "function") {
                this._selectables.splice(this._selectables.indexOf(<ISelectable>object), 1);
            }

        }

        public empty(): void {

            this._objects.length = 0;
            this._emitters.length = 0;
            this._targets.length = 0;
            this._selectables.length = 0;

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
            var keyUp: KeyboardEvent = null;
            var keyUpCode: number = -1;

            while (i--) {
                if (selectables[i].isMouseOver(this._mouse.x, this._mouse.y)) {
                    over = selectables[i];
                    break;
                }
            }

            if (this._over !== null) {
                this._over.selected = false;
            }

            // Stop drag
            if ((!this._mouse.down || !this._mouse.over) && this._dragging) {
                if (this._dragging.position.x !== this._mouse.x || this._dragging.position.y !== this._mouse.y) {
                    shouldInvalidate = true;
                }
                this._dragging = null;
            }

            // Key up
            if (this._keyUps.length > 0) {
                keyUp = this._keyUps.pop();
                keyUpCode = keyUp.keyCode;
            }

            if (over === null) {

                this._over = null;

            } else {

                this._over = over;
                over.selected = true;

            }

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
                case KeyboardKey.T:
                    this.addObject(new Target(new Vector2(this._mouse.x, this._mouse.y)));
                    shouldInvalidate = true;
                    break;
                case KeyboardKey.W:
                    if (this._drawing) {

                        this._drawing = false;

                        // Delete if nothing drawn
                        if (this._drawingWall.bounds.width === 0 || this._drawingWall.bounds.height === 0) {
                            this.removeObject(this._drawingWall);
                        }

                        this._drawingWall = null;

                    }
                    break;
                case (keyUpCode > 0 ? keyUpCode : null):
                    // console.log(keyUpCode);
            }

            if (this._drawing) {

                if (this._drawingWall === null) {
                    this._drawingWall = new Wall(new Rectangle(this._mouse.x, this._mouse.y, 1, 1));
                    this.addObject(this._drawingWall);
                }

                var newX = this._mouse.x;
                var newY = this._mouse.y;
                var fromX = this._drawingFromX;
                var fromY = this._drawingFromY;

                if (newX > fromX) {
                    this._drawingWall.bounds.right = newX;
                } else if (newX < fromX) {
                    this._drawingWall.bounds.left = newX;
                }

                if (newY > fromY) {
                    this._drawingWall.bounds.bottom = newY;
                } else if (newY < fromY) {
                    this._drawingWall.bounds.top = newY;
                }

                shouldInvalidate = true;

            }

            if (this._over !== null) {

                // Start drag
                if (this._dragging === null && this._mouse.down && typeof (<IMovable><IGameObject>over).moveTo === "function") {
                    this._dragging = <IMovable><IGameObject>over;
                    this._dragOffsetX = this._mouse.x - this._dragging.position.x;
                    this._dragOffsetY = this._mouse.y - this._dragging.position.y;
                }

                // Rotation
                if (typeof (<IRotatable><IGameObject>over).angle !== "undefined") {

                    if (this._mouse.scrollY !== 0) {

                        (<IRotatable><IGameObject>over).angle += this._mouse.scrollY / 2;
                        shouldInvalidate = true;

                    } else if (keyUpCode === KeyboardKey.Up || keyUpCode === KeyboardKey.Left) {

                        if (this._shiftKey) {
                            (<IRotatable><IGameObject>over).angle = (Math.ceil((<IRotatable><IGameObject>over).angle / 22.5) * 22.5) - 22.5;
                        } else {
                            (<IRotatable><IGameObject>over).angle--;
                        }

                        shouldInvalidate = true;

                    } else if (keyUpCode === KeyboardKey.Down || keyUpCode === KeyboardKey.Right) {

                        if (this._shiftKey) {
                            (<IRotatable><IGameObject>over).angle = (Math.floor((<IRotatable><IGameObject>over).angle / 22.5) * 22.5) + 22.5;
                        } else {
                            (<IRotatable><IGameObject>over).angle++;
                        }

                        shouldInvalidate = true;

                    }

                }

                // Delete
                if (keyUpCode === KeyboardKey.Backspace) {
                    this._over = null;
                    this.removeObject(over);
                    shouldInvalidate = true;
                }

            }

            // Dragging
            if (this._dragging !== null && (this._dragging.position.x !== this._mouse.x || this._dragging.position.y !== this._mouse.y)) {
                if (this._shiftKey) {
                    this._dragging.moveTo(Math.round((this._mouse.x - this._dragOffsetX) / 20) * 20, Math.round((this._mouse.y - this._dragOffsetY) / 20) * 20);
                } else {
                    this._dragging.moveTo(this._mouse.x - this._dragOffsetX, this._mouse.y - this._dragOffsetY);
                }
                shouldInvalidate = true;
            }

            this._renderer.setCursor(this._over !== null || this._dragging ? "move" : "");

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

        public loadFromJSON(data: Array<any>): void {

            var i: number = data.length,
                object: any;

            this.empty();

            while (i--) {
                object = data[i];
                switch (object.type) {
                    case "emitter":
                        this.addObject(new Emitter(this, new Vector2(object.position.x, object.position.y), object.colour, object.angle))
                        break;
                    case "mirror":
                        this.addObject(new Mirror(new Vector2(object.position.x, object.position.y), object.angle, object.width));
                        break;
                    case "filter":
                        this.addObject(new Filter(new Vector2(object.position.x, object.position.y), object.colour, object.angle, object.width));
                        break;
                    case "splitter":
                        this.addObject(new Splitter(new Vector2(object.position.x, object.position.y), object.angle));
                        break;
                    case "target":
                        this.addObject(new Target(new Vector2(object.position.x, object.position.y)));
                        break;
                    case "wall":
                        this.addObject(new Wall(new Rectangle(object.x, object.y, object.width, object.height), object.colour));
                        break;
                }
            }

            this.invalidate();

        }

        private _addEvents(): void {

            var el: HTMLElement = this._renderer.element;

            el.addEventListener("mouseover", this._onMouseOver);
            el.addEventListener("mousemove", this._onMouseMove.bind(this));
            el.addEventListener("mouseleave", this._onMouseLeave.bind(this));
            el.addEventListener("mousedown", this._onMouseDown.bind(this));
            el.addEventListener("mouseup", this._onMouseUp.bind(this));
            el.addEventListener("mousewheel", this._onMouseWheel.bind(this));
            el.addEventListener("keydown", this._onKeyDown.bind(this));
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
            this._drawing = false;
            this._drawingWall = null;
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
            } else if (!this._drawing && e.keyCode === KeyboardKey.W) {
                this._drawing = true;
                this._drawingFromX = this._mouse.x;
                this._drawingFromY = this._mouse.y;
            }

            this._shiftKey = e.shiftKey;

        }

        private _onKeyUp(e: KeyboardEvent): void {

            this._keyUps.unshift(e);
            this._shiftKey = e.shiftKey;

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