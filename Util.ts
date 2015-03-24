module rd3k.Laser.Util {

    export function wrapRadians(radians: number): number {

        if (radians < Math.PI) {
            radians += Math.PI * 2.0;
        }

        if (radians > Math.PI) {
            radians -= Math.PI * 2.0;
        }

        return radians;

    }

}