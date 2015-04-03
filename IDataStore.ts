module rd3k.Laser {

    export interface IDataStore {

        save(name: string, data: string): void
        load(name: string): string

    }

}