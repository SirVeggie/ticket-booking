import { chunkSubstr } from './stringTool';

function gradient(direction: string, from: string, to: string, curve: (t: number) => number, steps=15): string {
    const cfrom: Color = hexToColor(from);
    const cto: Color = hexToColor(to);
    
    let result = 'linear-gradient(' + direction;
    
    for (let i = 0; i <= steps; i++) {
        const t = (1.0 / steps) * i;
        const tt = curve(t);

        const color: Color = {
            r: lerp(cfrom.r, cto.r, tt),
            g: lerp(cfrom.g, cto.g, tt),
            b: lerp(cfrom.b, cto.b, tt),
            a: lerp(cfrom.a, cto.a, tt)
        };

        result += `, rgba(${printColor(color)}) ${(t * 100).toFixed(2)}%`;
    }

    return result + ')';
}

function hexToColor(hex: string): Color {
    if (hex[0] !== '#')
        throw 'Expected # in front of color hex value';
    hex = hex.slice(1);
    const values = chunkSubstr(hex, 2);
    
    if (values.length < 3 || values.length > 4)
        throw 'Not a valid color hex value';
    return {
        r: parseInt(values[0], 16) / 255,
        g: parseInt(values[1], 16) / 255,
        b: parseInt(values[2], 16) / 255,
        a: values.length < 4 ? 0xff : parseInt(values[3], 16) / 255
    };
}

function printColor(color: Color) {
    return `${color.r.toFixed(2)}, ${color.g.toFixed(2)}, ${color.b.toFixed(2)}, ${color.a.toFixed(2)}`;
}

function lerp(from: number, to: number, t: number): number {
    return from * (1 - t) + to * t;
}

interface Color {
    r: number,
    g: number,
    b: number,
    a: number,
}

export default gradient;