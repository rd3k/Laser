module rd3k.Laser.GUI {

    var _tweakerElement: HTMLElement = null;
    var _tweakingObject: IGameObject = null;
    var _dropOverlayElement: HTMLElement = null;

    export var levelNameElement: HTMLInputElement;

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

    export function setDropOverlayElement(value: HTMLElement): void {

        _dropOverlayElement = value;

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

}