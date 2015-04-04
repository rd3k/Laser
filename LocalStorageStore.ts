module rd3k.Laser {

    export class LocalStorageStore implements IDataStore {

        public save(name: string, data: string): void {

            localStorage.setItem(name, data);

        }

        public load(name: string): string {

            return localStorage.getItem(name);

        }

    }

}