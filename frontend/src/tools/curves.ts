
function adjustRange(value: number, min: number, max: number, newMin: number, newMax: number): number {
    return newMin + (newMax - newMin) * ((value - min) / (max - min));
}

export function split(a: Curve, b: Curve, ratio = 0.5): Curve {
    return t => t <= ratio ? a(t) : b(t);
}

export function combine(a: Curve, b: Curve, ratio = 0.5): Curve {
    return t => t <= ratio ? a(adjustRange(t, 0, ratio, 0, 1)) : b(adjustRange(t, ratio, 1, 0, 1));
}

export function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

type Curve = (t: number) => number;

export default { split, combine, easeInOutSine };