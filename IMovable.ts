module rd3k.Laser {

    export interface IMovable extends IGameObject {

        position: Vector2
        moveTo(x: number, y: number): void

    }

} 