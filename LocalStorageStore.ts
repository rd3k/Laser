module rd3k.Laser {

    export class LocalStorageStore implements IDataStore {

        constructor(private _scene: Scene) {}

        public save(name: string): void {

            localStorage.setItem(name, JSON.stringify(this._scene.objects));

        }

        public load(name: string): void {

            var data: string = localStorage.getItem(name);
            var parsedData: any;

            try {

                parsedData = JSON.parse(data);

                if (Array.isArray(parsedData)) {
                    this._scene.loadFromJSON(<Array<Object>>parsedData);
                } else {
                    throw Error;
                }

            } catch (ex) {
                debugger;
            }

        }

    }

}