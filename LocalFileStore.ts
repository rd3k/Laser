module rd3k.Laser {

    export class LocalFileStore implements IDataStore {

        constructor(private _scene: Scene, el: HTMLElement) {

            el.addEventListener("dragenter", this._onDragEnter.bind(this));
            el.addEventListener("dragover", this._onDragOver.bind(this));
            el.addEventListener("drop", this._onDrop.bind(this));

        }

        public save(name: string, data: string): void {

            console.log(name, data);

        }

        public load(name: string): string {

            return "";

        }
        private _onDragEnter(e: DragEvent): void {

            // console.log(e);

        }

        private _onDragOver(e: DragEvent): void {

            e.preventDefault();

        }

        private _onDrop(e: DragEvent): void {

            var files: FileList = e.dataTransfer.files;
            var reader: FileReader;

            if (files.length === 0 || files[0].type !== "application/json") {
                return;
            }

            console.log(files[0]);
            reader = new FileReader();

            reader.addEventListener("load", (e: ProgressEvent) => {

                var data: string = (<any>e.target).result;
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

            });

            reader.addEventListener("error", (e: ErrorEvent) => {

                console.log(e.error.code);

            });

            reader.readAsText(files[0]);

            e.preventDefault();
            e.stopPropagation();

        }

    }

}