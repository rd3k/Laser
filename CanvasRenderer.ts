module rd3k.Laser {

    export class CanvasRenderer implements IRenderer {

        public renderEmitter(emitter: Emitter): void {}
        public renderWall(wall: Wall): void {}
        public renderTarget(target: Target): void {}
        public renderMirror(mirror: Mirror): void {}
        public renderFilter(filter: Filter): void {}
        public renderSplitter(splitter: Splitter): void {}
        public renderGateWall(gateWall: GateWall): void {}
        public renderRay(ray: Ray): void {}

    }

} 