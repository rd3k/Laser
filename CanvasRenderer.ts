module rd3k.Laser {

    export class CanvasRenderer implements IRenderer {

        constructor(canvas: HTMLCanvasElement) {}

        public renderEmitter(emitter: Emitter): void {

            console.log("Rendering emitter", emitter);

        }

        public renderWall(wall: Wall): void {

            console.log("Render wall", wall);

        }

        public renderTarget(target: Target): void {

            console.log("Rendering target", target);

        }

        public renderMirror(mirror: Mirror): void {

            console.log("Rendering mirror", mirror);

        }

        public renderFilter(filter: Filter): void {

            console.log("Rendering filter", filter);

        }

        public renderSplitter(splitter: Splitter): void {

            console.log("Rendering splitter", splitter);

        }

        public renderGateWall(gateWall: GateWall): void {

            console.log("Render gate wall", gateWall);

        }

        public renderRay(ray: Ray): void {

            console.log("Render ray", ray);

        }

    }

} 