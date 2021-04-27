export function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// export function easeOutCubic(x) {
//     return 1 - Math.pow(1 - x, 3);
// }

// export function easeOutQuart(x) {
//     return 1 - Math.pow(1 - x, 4);
// }
