module rd3k.Laser {

    export class LocalFileStore implements IDataStore {

        constructor(private _scene: Scene) {

            var el: HTMLElement = _scene.renderer.element;

            el.addEventListener("dragenter", this._onDragEnter.bind(this));
            el.addEventListener("dragover", this._onDragOver.bind(this));
            el.addEventListener("dragleave", this._onDragLeave.bind(this));
            el.addEventListener("drop", this._onDrop.bind(this));

        }

        public save(name: string): void {

            var url = URL.createObjectURL(new Blob([JSON.stringify(this._scene.objects)], {
                type: "application/json",
                lastModified: Date.now()
            }));

            var link = document.createElement("a");

            link.href = url;
            link.download = name + ".json";
            document.body.firstElementChild.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

        }

        public load(): void {}

        private _onDragEnter(e: DragEvent): void {

            var files = e.dataTransfer.files || [];
            var items: Array<any> = (<any>e.dataTransfer).items || [];

            if ((files.length === 0 || files[0].type !== "application/json") && (items.length === 0 || items[0].type !== "application/json" )) {
                return;
            }

            GUI.showDropOverlay();

        }

        private _onDragOver(e: DragEvent): void {

            e.preventDefault();

        }

        private _onDragLeave(e: DragEvent): void {

            GUI.hideDropOverlay();

        }

        private _onDrop(e: DragEvent): void {

            var files = e.dataTransfer.files || [];
            var reader: FileReader;
            var name: string;

            e.preventDefault();
            e.stopPropagation();

            GUI.hideDropOverlay();

            if (files.length === 0 || files[0].type !== "application/json") {
                return;
            }

            reader = new FileReader();
            name = files[0].name;
            name = name.substr(0, name.lastIndexOf('.'));

            reader.addEventListener("load", (e: ProgressEvent) => {

                var data: string = (<any>e.target).result;
                var parsedData: any;

                try {

                    parsedData = JSON.parse(data);

                    if (Array.isArray(parsedData)) {
                        this._scene.loadFromJSON(<Array<Object>>parsedData);
                        GUI.setLevelName(name);
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

        }

    }

}