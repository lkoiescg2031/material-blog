export function fmod(a: number, b: number): Number {
  return Number((a - Math.floor(a / b) * b).toPrecision(8));
}
