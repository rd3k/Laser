module rd3k.Laser {

    export class LocalStorageStore implements IDataStore {

        public save(name: string, data: string): void {

            console.log(name, data);

        }

        public load(name: string): string {

            return "";

        }

    }

}