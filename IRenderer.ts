﻿module rd3k.Laser {

    export interface IRenderer {

        element: HTMLElement
        clear(): void
        toImageData(cb: (data: string) => void): void
        setCursor(cursor: string): void
        renderEmitter(emitter: Emitter): void
        renderWall(wall: Wall): void
        renderTarget(target: Target): void
        renderMirror(mirror: Mirror): void
        renderFilter(filter: Filter): void
        renderSplitter(splitter: Splitter): void
        renderRay(ray: Ray): void
        renderRayHit(rayHit: RayHit): void

    }

}