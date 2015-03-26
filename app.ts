/// <reference path="util.ts" />
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
/// <reference path="Laser.ts" />

import Laser = rd3k.Laser;

var renderer = new Laser.CanvasRenderer(<HTMLCanvasElement>document.querySelector("#demo"));
var scene = new Laser.Scene(renderer);

scene.addObjects(
    new Laser.Wall(new Laser.Rectangle(500, 0, 40, 600)),
    new Laser.Emitter(scene, new Laser.Vector2(50, 50), "red"),
    new Laser.Mirror(new Laser.Vector2(100, 50), 45),
    new Laser.Mirror(new Laser.Vector2(100, 250), 45),
    new Laser.Filter(new Laser.Vector2(200, 250), 90, "blue"),
    new Laser.Target(new Laser.Vector2(250, 250)),
    new Laser.Target(new Laser.Vector2(600, 250)),
    new Laser.Splitter(new Laser.Vector2(300, 250), 105),
    new Laser.GateWall(new Laser.Rectangle(75, 125, 50, 50), "red")
);

Laser.Ray.createPool(64);

(function loop() {

    requestAnimationFrame(loop);
    scene.invalidate();
    scene.update();
    scene.draw();
    Laser.Ray.resetPool();

})();