export interface Point {
  x: number;
  y: number;
}

export interface Line {
  a: Point;
  b: Point;
}

export function normalizeDeg(deg: number): number {
  const quotient = Math.floor(Math.abs(deg) / 360);

  if (deg >= 360) {
    return deg - quotient * 360;
  } else if (deg < 0) {
    return (quotient + 1) * 360 + deg;
  } else {
    return deg;
  }
}

export function degToRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function substractDeg(a: number, b: number): number {
  return normalizeDeg(a - b);
}
export function addDeg(a: number, b: number): number {
  return normalizeDeg(a + b);
}

export function pointLt(p1: Point, p2: Point): boolean {
  if (p1.x == p2.x) {
    return p1.y < p2.y;
  } else {
    return p1.x < p2.x;
  }
}

export function ccw(p1: Point, p2: Point, p3: Point): number {
  return (
    p1.x * p2.y +
    p2.x * p3.y +
    p3.x * p1.y -
    p1.y * p2.x -
    p2.y * p3.x -
    p3.y * p1.x
  );
}

export function isIntersection(
  a: Point,
  b: Point,
  c: Point,
  d: Point,
): boolean {
  const ab = ccw(a, b, c) * ccw(a, b, d);
  const cd = ccw(c, d, a) * ccw(c, d, b);

  if (ab == 0 && cd == 0) {
    if (pointLt(b, a)) [a, b] = [b, a];
    if (pointLt(d, c)) [c, d] = [d, c];
    return !(pointLt(b, c) || pointLt(d, a));
  }

  return ab <= 0 && cd <= 0;
}
