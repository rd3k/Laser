module rd3k.Laser.GUI {

    var _tweakerElement: HTMLElement = null;
    var _tweakingObject: IGameObject = null;

    export var dropOverlayElement: HTMLElement = null;
    export var hudElement: HTMLElement = null;
    export var levelNameElement: HTMLInputElement = null;
    export var creationsOverlayElement: HTMLElement = null;
    export var creationsListElement: HTMLElement = null;

    export function setTweakerElement(value: HTMLElement) {

        _tweakerElement = value;
        _tweakerElement.addEventListener("mousemove", (e: MouseEvent) => {
            e.stopPropagation();
        });

    }

    export function addTweakerEventListener(selector: string, event: string, handler: (e: Event, object: IGameObject) => void): void {

        var el: HTMLElement = <HTMLElement>_tweakerElement.querySelector(selector);

        if (el) {
            el.addEventListener(event, e => handler.call(null, e, _tweakingObject));
        }

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

        if (dropOverlayElement) {
            dropOverlayElement.classList.add("visible");
        }

    }

    export function hideDropOverlay(): void {

        if (dropOverlayElement) {
            dropOverlayElement.classList.remove("visible");
        }

    }

    export function showCreationsOverlay(items: Array<ILocalStorageEntry>): void {

        var template = (<HTMLTemplate>document.querySelector("#creation-item-tpl")).content,
            i = items.length,
            item: HTMLElement;

        if (hudElement && creationsOverlayElement) {

            hudElement.classList.add("hidden");
            creationsListElement.innerText = "";

            while (i--) {
                item = <HTMLElement>template.cloneNode(true);
                (<HTMLElement>item.firstChild).setAttribute("data-name", items[i].name);
                (<HTMLInputElement>item.querySelector("img")).src = items[i].image;
                (<HTMLSpanElement>item.querySelector("span")).innerText = items[i].name;
                creationsListElement.appendChild(item);
            }

            setTimeout(() => {
                creationsOverlayElement.classList.add("visible");
            }, 200);

        }

    }

    export function hideCreationsOverlay(): void {

        if (hudElement && creationsOverlayElement) {
            hudElement.classList.remove("hidden");
            creationsOverlayElement.classList.remove("visible");
        }

    }
}