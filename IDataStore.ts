module rd3k.Laser {

    export interface IDataStore {

        save(name: string): void
        load(name?: string): void

    }

}