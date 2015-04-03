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

// ES6
interface Function {
    name: string
}

import Laser = rd3k.Laser;

var renderer = new Laser.CanvasRenderer(<HTMLCanvasElement>document.querySelector("#demo"));
var scene = new Laser.Scene(renderer);

scene.addObjects(
    new Laser.Emitter(scene, new Laser.Vector2(50, 50), "red"),
    new Laser.Emitter(scene, new Laser.Vector2(300, 400), "lime", -90),
    new Laser.Mirror(new Laser.Vector2(100, 50), 45),
    new Laser.Mirror(new Laser.Vector2(100, 250), 45),
    new Laser.Filter(new Laser.Vector2(200, 250), "blue", 90),
    new Laser.Target(new Laser.Vector2(250, 250)),
    new Laser.Target(new Laser.Vector2(600, 300)),
    new Laser.Splitter(new Laser.Vector2(300, 250), 105),
    new Laser.Wall(new Laser.Rectangle(500, 0, 40, 150)),
    new Laser.GateWall(new Laser.Rectangle(500, 150, 40, 50), "red"),
    new Laser.Wall(new Laser.Rectangle(500, 200, 40, 75)),
    new Laser.GateWall(new Laser.Rectangle(500, 275, 40, 50), "lime"),
    new Laser.Wall(new Laser.Rectangle(500, 325, 40, 75)),
    new Laser.GateWall(new Laser.Rectangle(500, 400, 40, 50), "blue"),
    new Laser.Wall(new Laser.Rectangle(500, 450, 40, 150)),
    new Laser.GateWall(new Laser.Rectangle(75, 125, 50, 50), "red")
);

Laser.Ray.createPool(64);
Laser.RayHit.createPool(16);
Laser.Vector2.createPool(512);

Laser.GUI.setTweakerElement(<HTMLElement>document.querySelector("#tweaker"));

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

scene.invalidate();

(function loop() {

    requestAnimationFrame(loop);
    scene.update();
    scene.draw();
    Laser.Ray.resetPool();
    Laser.RayHit.resetPool();
    Laser.Vector2.resetPool();

})();