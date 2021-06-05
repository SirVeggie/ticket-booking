
//====| Helper functions |====//

function adjustRange(value: number, min: number, max: number, newMin: number, newMax: number): number {
    return newMin + (newMax - newMin) * ((value - min) / (max - min));
}

//====| Higher order curves |====//

export function split(a: Curve, b: Curve, ratio = 0.5): Curve {
    return t => t <= ratio ? a(t) : b(t);
}

export function combine(a: Curve, b: Curve, ratio = 0.5): Curve {
    return t => t <= ratio ? a(adjustRange(t, 0, ratio, 0, 1)) : b(adjustRange(t, ratio, 1, 0, 1));
}

//====| Default curves |====//

export function easeInSine(x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);
}

export function easeOutSine(x: number): number {
    return Math.sin((x * Math.PI) / 2);
}

export function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}


export function easeInCubic(x: number): number {
    return x * x * x;
}

export function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

type Curve = (t: number) => number;

export default { split, combine, easeInSine, easeOutSine, easeInOutSine, easeInCubic, easeOutCubic, easeInOutCubic };