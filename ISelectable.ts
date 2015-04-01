module rd3k.Laser {

    export interface ISelectable extends IGameObject {

        isMouseOver(x: number, y: number): boolean
        selected: boolean

    }

}