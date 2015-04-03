module rd3k.Laser.GUI {

    var _tweakerElement: HTMLElement = null;
    var _tweakingObject: IGameObject = null;

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
            _tweakerElement.classList.add("visible");
            _tweakerElement.setAttribute("style", `left:${x}px; top:${y}px;`);
            _tweakerElement.classList.add(object.constructor.name.toLowerCase());

        }

    }

    export function hideTweaker(): void {

        if (_tweakerElement) {
            _tweakingObject = null;
            _tweakerElement.className = "";
        }

    }

} 