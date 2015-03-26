module rd3k.Laser {

    export class CanvasRenderer implements IRenderer {

        private _context: CanvasRenderingContext2D;
        private _width: number;
        private _height: number;

        constructor(canvas: HTMLCanvasElement) {

            this._context = canvas.getContext("2d");
            this._width = canvas.width;
            this._height = canvas.height;

        }

        public invalidate(): void {

            this._context.clearRect(0, 0, this._width, this._height);

        }

        public renderEmitter(emitter: Emitter): void {

            var ctx = this._context;

            ctx.save();
            ctx.translate(emitter.position.x, emitter.position.y);
            ctx.rotate(Util.toRadians(emitter.angle));
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0.5, 2 * Math.PI - 0.5);
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

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#ccc";
            ctx.moveTo(mirror.a.x, mirror.a.y);
            ctx.lineTo(mirror.b.x, mirror.b.y);
            ctx.stroke();

        }

        public renderFilter(filter: Filter): void {

            var ctx = this._context;

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = filter.colour;
            ctx.moveTo(filter.a.x, filter.a.y);
            ctx.lineTo(filter.b.x, filter.b.y);
            ctx.stroke();

        }

        public renderSplitter(splitter: Splitter): void {

            var ctx = this._context;

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.fillStyle = "#eee";
            ctx.strokeStyle = "#333";
            ctx.translate(splitter.position.x, splitter.position.y);
            ctx.rotate(Util.toRadians(splitter.angle - 45));
            ctx.strokeRect(-(splitter.width / 2), -(splitter.width / 2), splitter.width, splitter.width);
            ctx.fill();
            ctx.moveTo(-(splitter.width / 2), -(splitter.width / 2));
            ctx.lineTo(splitter.width / 2, splitter.width / 2);
            ctx.stroke();
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

    }

} 