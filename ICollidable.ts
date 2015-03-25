module rd3k.Laser {

    export interface ICollidable extends IGameObject {

        getIntersection(inA: Vector2, inB: Vector2, outVector: Vector2): boolean
        getRays(sourceRay: Ray): Array<Ray>

    }

}