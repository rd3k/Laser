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

Laser.GUI.init();

scene.invalidate();

(function loop() {

    requestAnimationFrame(loop);
    scene.update();
    scene.draw();
    Laser.Ray.resetPool();
    Laser.RayHit.resetPool();
    Laser.Vector2.resetPool();

})();