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

// -_-
interface Window {
    webkitIndexedDB: any
    mozIndexedDB: any
    OIndexedDB: any
    msIndexedDB: any
}

// -_-
interface HTMLTemplate extends HTMLElement {
    content: HTMLElement
}

window.addEventListener("error", (e: ErrorEvent) => {
    alert(e.message + " - line " + e.lineno + " column " + e.colno);
});

if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}

window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;

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
Laser.GUI.dropOverlayElement = <HTMLElement>document.querySelector("#drop");
Laser.GUI.creationsOverlayElement = <HTMLElement>document.querySelector("#creations");
Laser.GUI.creationsListElement = <HTMLElement>document.querySelector("#creations-list");
Laser.GUI.hudElement = <HTMLElement>document.querySelector("#hud");
Laser.GUI.levelNameElement = <HTMLInputElement>(document.querySelector("#level-name"));
Laser.GUI.infoElement = <HTMLElement>(document.querySelector("#info"));

Laser.GUI.addTweakerEventListener("#delete", "mouseup", (e: MouseEvent, o: Laser.IGameObject) => {
    if (e.button === 0) {
        scene.removeObject(o);
        scene.invalidate();
        Laser.GUI.hideTweaker();
    }
});

["red", "lime", "blue", "grey"].forEach(c => Laser.GUI.addTweakerEventListener(`#${c}`, "mouseup", (e: MouseEvent, o: Laser.IGameObject) => {
    if (e.button === 0 && (o instanceof Laser.Emitter || o instanceof Laser.Filter || o instanceof Laser.Wall)) {
        o.colour = c;
        scene.invalidate();
        Laser.GUI.hideTweaker();
    }
}));

document.querySelector("#clear").addEventListener("mouseup", (e: MouseEvent) => {
    if (e.button === 0) {
        if (scene.objects.length > 0 && confirm("Remove all objects?")) {
            scene.empty.call(scene);
        }
    }
});

document.querySelector("#new").addEventListener("mouseup", (e: MouseEvent) => {
    if (e.button === 0) {
        if (scene.objects.length > 0 && confirm("Remove all objects?")) {
            scene.empty.call(scene);
        }
        Laser.GUI.levelNameElement.value = "";
    }
});

document.querySelector("#save").addEventListener("mouseup", (e: MouseEvent) => {
    if (e.button === 0) {

        var name = Laser.GUI.levelNameElement.value;

        if (scene.objects.length === 0) {
            alert("Level is empty!");
            return;
        }

        if (name.trim().length === 0) {
            name = "unnamed-" + Date.now();
        }

        browserStore.save(name);

    }
});


document.querySelector("#download").addEventListener("mouseup", (e: MouseEvent) => {
    if (e.button === 0) {

        var name = Laser.GUI.levelNameElement.value;

        if (scene.objects.length === 0) {
            alert("Level is empty!");
            return;
        }

        if (name.trim().length === 0) {
            name = "unnamed-" + Date.now();
        }

        fileStore.save(name);

    }
});

document.querySelector("#load").addEventListener("mouseup", (e: MouseEvent) => {
    if (e.button === 0) {
        Laser.GUI.showCreationsOverlay(browserStore.getList());
    }
});

document.querySelector("#help").addEventListener("mouseup", (e: MouseEvent) => {
    if (e.button === 0) {
        Laser.GUI.showInfo();
    }
});

document.querySelector("#creations-list").addEventListener("mouseup", (e: MouseEvent) => {

    var name: string;

    if (e.button === 0 && (<HTMLElement>e.target).className === "creations-item") {
        Laser.GUI.hideCreationsOverlay();
        name = (<HTMLElement>e.target).getAttribute("data-name")
        browserStore.load(name);
        Laser.GUI.levelNameElement.value = name;
    }

});

document.querySelector("#close-creations").addEventListener("mouseup", (e: MouseEvent) => {
    if (e.button === 0) {
        Laser.GUI.hideCreationsOverlay();
    }
});

document.querySelector("#close-info").addEventListener("mouseup",(e: MouseEvent) => {
    if (e.button === 0) {
        Laser.GUI.hideInfo();
    }
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