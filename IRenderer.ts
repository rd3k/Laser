module rd3k.Laser {

    export interface IRenderer {

        renderEmitter(emitter: Emitter): void
        renderWall(wall: Wall): void
        renderTarget(target: Target): void
        renderMirror(mirror: Mirror): void
        renderFilter(filter: Filter): void
        renderSplitter(splitter: Splitter): void
        renderGateWall(gateWall: GateWall): void
        renderRay(ray: Ray): void

    }

} 