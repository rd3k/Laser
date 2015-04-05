module rd3k.Laser {

    export class CanvasRenderer implements IRenderer {

        private _context: CanvasRenderingContext2D;
        private _width: number;
        private _height: number;

        public get element(): HTMLElement {

            return <HTMLElement>this._canvas;

        }

        constructor(private _canvas: HTMLCanvasElement) {

            this._context = _canvas.getContext("2d");
            this._width = _canvas.width;
            this._height = _canvas.height;

        }

        public clear(): void {

            var ctx = this._context;
            var i: number = this._width;

            this._context.clearRect(0, 0, this._width, this._height);

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#f4f4f4";

            while (i -= 20) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, this._height);
                ctx.stroke();
            }

            i = this._height;

            while (i -= 20) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(this._width, i);
                ctx.stroke();
            }

        }

        public setCursor(cursor: string): void {

            this._canvas.style.cursor = cursor;

        }

        public renderEmitter(emitter: Emitter): void {

            var ctx = this._context;

            if (emitter.selected) {
                ctx.beginPath();
                ctx.arc(emitter.position.x, emitter.position.y, emitter.width / 2, 0, 2 * Math.PI);
                ctx.fillStyle = "#eee";
                ctx.fill();
            }

            ctx.save();
            ctx.translate(emitter.position.x, emitter.position.y);
            ctx.rotate(Util.toRadians(emitter.angle));
            ctx.beginPath();
            ctx.arc(0, 0, emitter.width / 2, 0.5, 2 * Math.PI - 0.5);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.restore();

        }

        public renderWall(wall: Wall): void {

            var ctx = this._context;

            ctx.beginPath();
            ctx.fillStyle = "#333";
            ctx.fillRect(wall.bounds.topLeft.x, wall.bounds.topLeft.y, wall.bounds.width, wall.bounds.height);
            ctx.fill();

        }

        public renderTarget(target: Target): void {

            var ctx = this._context;

            ctx.beginPath();
            ctx.arc(target.position.x, target.position.y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = target.hit ? "yellow" : "#222";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.stroke();

        }

        public renderMirror(mirror: Mirror): void {

            var ctx = this._context;

            ctx.save();
            ctx.translate(mirror.position.x, mirror.position.y);
            ctx.rotate(Util.toRadians(mirror.angle));

            if (mirror.selected) {
                ctx.beginPath();
                ctx.arc(0, 0, mirror.width / 2, 0, 2 * Math.PI);
                ctx.fillStyle = "#eee";
                ctx.fill();
            }

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#ccc";
            ctx.moveTo(-mirror.width / 2, 0);
            ctx.lineTo(mirror.width / 2, 0);
            ctx.stroke();
            ctx.restore();

        }

        public renderFilter(filter: Filter): void {

            var ctx = this._context;

            ctx.save();
            ctx.translate(filter.position.x, filter.position.y);
            ctx.rotate(Util.toRadians(filter.angle));

            if (filter.selected) {
                ctx.beginPath();
                ctx.arc(0, 0, filter.width / 2, 0, 2 * Math.PI);
                ctx.fillStyle = "#eee";
                ctx.fill();
            }

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = filter.colour;
            ctx.moveTo(-filter.width / 2, 0);
            ctx.lineTo(filter.width / 2, 0);
            ctx.stroke();
            ctx.restore();

        }

        public renderSplitter(splitter: Splitter): void {

            var ctx = this._context;
            var width = splitter.width * Math.cos(Math.PI / 4);

            if (splitter.selected) {
                ctx.beginPath();
                ctx.arc(splitter.position.x, splitter.position.y, width, 0, 2 * Math.PI);
                ctx.fillStyle = "#eee";
                ctx.fill();
            }

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.fillStyle = "#eee";
            ctx.strokeStyle = "#333";
            ctx.translate(splitter.position.x, splitter.position.y);
            ctx.rotate(Util.toRadians(splitter.angle));
            ctx.moveTo(-splitter.width / 2, 0);
            ctx.lineTo(splitter.width / 2, 0);
            ctx.stroke();
            ctx.rotate(Util.toRadians(45));
            ctx.strokeRect(-(width / 2), -(width / 2), width, width);
            ctx.fill();
            ctx.restore();

        }

        public renderGateWall(gateWall: GateWall): void {

            var ctx = this._context;

            ctx.beginPath();
            ctx.fillStyle = gateWall.colour;
            ctx.fillRect(gateWall.bounds.topLeft.x, gateWall.bounds.topLeft.y, gateWall.bounds.width, gateWall.bounds.height);
            ctx.fill();

        }

        public renderRay(ray: Ray): void {

            var ctx = this._context;

            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = ray.colour;
            ctx.moveTo(ray.from.x, ray.from.y);
            ctx.lineTo(ray.to.x, ray.to.y);
            ctx.stroke();

        }

        public renderRayHit(rayHit: RayHit): void {

            var ctx = this._context;

            ctx.save();
            ctx.translate(rayHit.position.x, rayHit.position.y);
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, 2 * Math.PI);
            ctx.fillStyle = rayHit.colour;
            ctx.fill();
            ctx.restore();

        }

    }

} 