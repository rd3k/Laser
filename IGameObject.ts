module rd3k.Laser {

    export interface IGameObject {

        update(): void
        draw(renderer: IRenderer): void
        dispose(): void
        toJSON(): IGameObjectJSON

    }

}