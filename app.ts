/// <reference path="util.ts" />
/// <reference path="Vector2.ts" />
/// <reference path="LaserScene.ts" />
/// <reference path="CanvasRenderer.ts" />
/// <reference path="Emitter.ts" />
/// <reference path="Mirror.ts" />
/// <reference path="Filter.ts" />
/// <reference path="Wall.ts" />
/// <reference path="GateWall.ts" />
/// <reference path="Target.ts" />
/// <reference path="Ray.ts" />
/// <reference path="Laser.ts" />

import Laser = rd3k.Laser;

var renderer = new Laser.CanvasRenderer(<HTMLCanvasElement>document.querySelector("#demo"));
var scene = new Laser.Scene(renderer);

scene.addObject(new Laser.Emitter(scene, new Laser.Vector2(), "#000"));
scene.addObject(new Laser.Mirror(new Laser.Vector2(100, 0), 45));

scene.invalidate();
scene.update();
scene.draw();