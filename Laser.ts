module rd3k.Laser {

    export class Laser {

        private _rays: Array<Ray>;

        public get colour(): string {

            return this._emitter.colour;

        }

        constructor(private _emitter: Emitter) {}

        public calculateRays(): void {}

    }

}