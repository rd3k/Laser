module rd3k.Laser.Scene {

    var objects: Array<IGameObject>;
    var renderer: IRenderer;

    export function init() {

        objects.push(new Emitter(Vector2.Zero, "#fff"));

    }

    export function update() {

        var i = objects.length;
        while (i--) {
            objects[i].update();
        }

    }

    export function draw() {

        var i = objects.length;
        while (i--) {
            objects[i].draw(renderer);
        }

    }

}