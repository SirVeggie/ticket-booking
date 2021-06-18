
export function lines(angle: number, color1: string, color2: string, width: number = 3, blur: number = 0) {
    return `repeating-linear-gradient(${angle}deg, ${color1} 0%, ${color2} ${blur}%, ${color2} ${blur + width}%, ${color1} ${blur*2 + width}%, ${color1} ${blur*2 + width*2}%)`;
}
