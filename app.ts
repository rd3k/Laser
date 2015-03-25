import Laser = rd3k.Laser;

var renderer = new Laser.CanvasRenderer();
var scene = new Laser.Scene(renderer);

scene.addObject(new Laser.Emitter(new Laser.Vector2(), "#fff"));