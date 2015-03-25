module rd3k.Laser.Util {

    export function wrapRadians(radians: number): number {

        if (radians < Math.PI) {
            radians += Math.PI * 2;
        }

        if (radians > Math.PI) {
            radians -= Math.PI * 2;
        }

        return radians;

    }

    export function toDegrees(radians: number) {

        return radians * (180 / Math.PI);

    }

    export function toRadians(degrees: number) {

        return degrees * (Math.PI / 180);

    }

}