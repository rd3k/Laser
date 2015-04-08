module rd3k.Laser.GUI {

    var _tweakingObject: IGameObject = null;

    var _tweakerElement: HTMLElement = null;
    var _dropOverlayElement: HTMLElement = null;
    var _hudElement: HTMLElement = null;
    var _levelNameElement: HTMLInputElement = null;
    var _creationsOverlayElement: HTMLElement = null;
    var _creationsListElement: HTMLElement = null;
    var _infoElement: HTMLElement = null;

    export function init() {

        _tweakerElement = <HTMLElement>document.querySelector("#tweaker");
        _tweakerElement.addEventListener("mousemove", (e: MouseEvent) => {
            e.stopPropagation();
        });

        _dropOverlayElement = <HTMLElement>document.querySelector("#drop");
        _hudElement = <HTMLElement>document.querySelector("#hud");
        _levelNameElement = <HTMLInputElement>document.querySelector("#level-name");
        _creationsOverlayElement = <HTMLElement>document.querySelector("#creations");
        _creationsListElement = <HTMLElement>document.querySelector("#creations-list");
        _infoElement = <HTMLElement>document.querySelector("#info");

        addTweakerEventListener("#delete", "mouseup", (e: MouseEvent, o: Laser.IGameObject) => {
            if (e.button === 0) {
                scene.removeObject(o);
                scene.invalidate();
                hideTweaker();
            }
        });

        ["red", "lime", "blue", "grey"].forEach(c => addTweakerEventListener(`#${c}`, "mouseup", (e: MouseEvent, o: Laser.IGameObject) => {
            if (e.button === 0 && (o instanceof Emitter || o instanceof Filter || o instanceof Wall)) {
                o.colour = c;
                scene.invalidate();
                hideTweaker();
            }
        }));

        document.querySelector("#clear").addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {
                if (scene.objects.length > 0 && confirm("Remove all objects?")) {
                    scene.empty.call(scene);
                }
            }
        });

        document.querySelector("#new").addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {
                if (scene.objects.length > 0 && confirm("Remove all objects?")) {
                    scene.empty.call(scene);
                }
                setLevelName("");
            }
        });

        document.querySelector("#save").addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {

                var name = _levelNameElement.value;

                if (scene.objects.length === 0) {
                    alert("Level is empty!");
                    return;
                }

                if (name.trim().length === 0) {
                    name = "unnamed-" + Date.now();
                }

                browserStore.save(name);

            }
        });

        document.querySelector("#download").addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {

                var name = _levelNameElement.value;

                if (scene.objects.length === 0) {
                    alert("Level is empty!");
                    return;
                }

                if (name.trim().length === 0) {
                    name = "unnamed-" + Date.now();
                }

                fileStore.save(name);

            }
        });

        document.querySelector("#load").addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {
                showCreationsOverlay(browserStore.getList());
            }
        });

        document.querySelector("#help").addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {
                showInfo();
            }
        });

        document.querySelector("#creations-list").addEventListener("mouseup",(e: MouseEvent) => {

            var name: string;

            if (e.button === 0 && (<HTMLElement>e.target).className === "creations-item") {
                hideCreationsOverlay();
                name = (<HTMLElement>e.target).getAttribute("data-name")
                browserStore.load(name);
                setLevelName(name);
            }

        });

        document.querySelector("#close-creations").addEventListener("mouseup",(e: MouseEvent) => {
            if (e.button === 0) {
                hideCreationsOverlay();
            }
        });

        document.querySelector("#close-info").addEventListener("mouseup",(e: MouseEvent) => {
            if (e.button === 0) {
                hideInfo();
            }
        });

    }

    export function showTweaker(x: number, y: number, object: IGameObject): void {

        if (_tweakerElement) {
            _tweakingObject = object;
            _tweakerElement.className = "visible " + object.constructor.name.toLowerCase();
            _tweakerElement.setAttribute("style", `left:${x}px; top:${y}px;`);
        }

    }

    export function hideTweaker(): void {

        if (_tweakerElement) {
            _tweakingObject = null;
            _tweakerElement.className = "";
        }

    }

    export function showDropOverlay(): void {

        if (_dropOverlayElement) {
            _dropOverlayElement.classList.add("visible");
        }

    }

    export function hideDropOverlay(): void {

        if (_dropOverlayElement) {
            _dropOverlayElement.classList.remove("visible");
        }

    }

    export function showCreationsOverlay(items: Array<ILocalStorageEntry>): void {

        var template = (<HTMLTemplate>document.querySelector("#creation-item-tpl")).content,
            i = items.length,
            item: HTMLElement;

        if (_hudElement && _creationsOverlayElement) {

            _hudElement.classList.add("hidden");
            _creationsListElement.innerText = "";

            while (i--) {
                item = <HTMLElement>template.cloneNode(true);
                (<HTMLElement>item.firstChild).setAttribute("data-name", items[i].name);
                (<HTMLInputElement>item.querySelector("img")).src = items[i].image;
                (<HTMLSpanElement>item.querySelector("span")).innerText = items[i].name;
                _creationsListElement.appendChild(item);
            }

            setTimeout(() => {
                _creationsOverlayElement.classList.add("visible");
            }, 200);

        }

    }

    export function hideCreationsOverlay(): void {

        if (_hudElement && _creationsOverlayElement) {
            _hudElement.classList.remove("hidden");
            _creationsOverlayElement.classList.remove("visible");
        }

    }

    export function showInfo(): void {

        if (_hudElement && _infoElement) {

            _hudElement.classList.add("hidden");

            setTimeout(() => {
                _infoElement.classList.add("visible");
            }, 200);

        }

    }

    export function hideInfo(): void {

        if (_hudElement && _infoElement) {
            _hudElement.classList.remove("hidden");
            _infoElement.classList.remove("visible");
        }

    }

    export function setLevelName(value: string): void {

        _levelNameElement.value = value;

    }

    function addTweakerEventListener(selector: string, event: string, handler: (e: Event, object: IGameObject) => void): void {

        var el: HTMLElement = <HTMLElement>_tweakerElement.querySelector(selector);

        if (el) {
            el.addEventListener(event, e => handler.call(null, e, _tweakingObject));
        }

    }

}