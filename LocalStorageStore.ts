module rd3k.Laser {

    export class LocalStorageStore implements IDataStore {

        constructor(private _scene: Scene) {}

        public save(name: string): void {

            try {
                this._scene.renderer.toImageData((data: string) => {
                    localStorage.setItem(name, JSON.stringify(this._scene.objects));
                    localStorage.setItem(name + "_img", data);
                    alert("Level has been saved to localStorage!");
                });
            } catch (ex) {
                debugger;
            }

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

        public getList(): Array<ILocalStorageEntry> {

            var levels = Object.keys(localStorage),
                data: Array<ILocalStorageEntry> = [],
                i = levels.length;

            while (i--) {
                if (!/_img$/.test(levels[i])) {
                    data.push({
                        name: levels[i],
                        image: localStorage.hasOwnProperty(levels[i] + "_img") ? localStorage[levels[i] + "_img"] : ""
                    });
                }
            }

            return data;

        }

    }

}