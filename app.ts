/// <reference path="util.ts" />
/// <reference path="GUI.ts" />
/// <reference path="Vector2.ts" />
/// <reference path="Rectangle.ts" />
/// <reference path="LaserScene.ts" />
/// <reference path="CanvasRenderer.ts" />
/// <reference path="Emitter.ts" />
/// <reference path="Mirror.ts" />
/// <reference path="Filter.ts" />
/// <reference path="Wall.ts" />
/// <reference path="GateWall.ts" />
/// <reference path="Target.ts" />
/// <reference path="Splitter.ts" />
/// <reference path="Ray.ts" />
/// <reference path="RayHit.ts" />
/// <reference path="Laser.ts" />
/// <reference path="LocalStorageStore.ts" />
/// <reference path="LocalFileStore.ts" />

// ES6
interface Function {
    name: string
}

// HTML5
interface HTMLAnchorElement {
    download: any
}

import Laser = rd3k.Laser;

var canvas = <HTMLCanvasElement>document.querySelector("#demo")
var renderer = new Laser.CanvasRenderer(canvas);
var scene = new Laser.Scene(renderer);

var browserStore = new Laser.LocalStorageStore(scene);
var fileStore = new Laser.LocalFileStore(scene);

Laser.Ray.createPool(64);
Laser.RayHit.createPool(16);
Laser.Vector2.createPool(64);

Laser.GUI.setTweakerElement(<HTMLElement>document.querySelector("#tweaker"));
Laser.GUI.setDropOverlayElement(<HTMLElement>document.querySelector("#drop"));
Laser.GUI.levelNameElement = <HTMLInputElement>(document.querySelector("#level-name"));

Laser.GUI.addTweakerEventListener("#delete", "mouseup", (e: MouseEvent, o: Laser.IGameObject) => {
    if (e.button === 0) {
        scene.removeObject(o);
        scene.invalidate();
        Laser.GUI.hideTweaker();
    }
});

["red", "lime", "blue"].forEach(c => Laser.GUI.addTweakerEventListener(`#${c}`, "mouseup", (e: MouseEvent, o: Laser.IGameObject) => {
    if (e.button === 0 && (o instanceof Laser.Emitter || o instanceof Laser.Filter)) {
        o.colour = c;
        scene.invalidate();
        Laser.GUI.hideTweaker();
    }
}));

document.querySelector("#clear").addEventListener("mouseup", (e: MouseEvent) => {

    if (confirm("Remove all objects?")) {
        scene.empty.call(scene);
    }

});

document.querySelector("#save").addEventListener("mouseup", (e: MouseEvent) => {

    var name = Laser.GUI.levelNameElement.value;

    if (scene.objects.length === 0) {
        alert("Level is empty!");
        return;
    }

    if (name.trim().length === 0) {
        name = "unnamed-" + Date.now();
    }

    fileStore.save(name);

});

scene.invalidate();

(function loop() {

    requestAnimationFrame(loop);
    scene.update();
    scene.draw();
    Laser.Ray.resetPool();
    Laser.RayHit.resetPool();
    Laser.Vector2.resetPool();

})();