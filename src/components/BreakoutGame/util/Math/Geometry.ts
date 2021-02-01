import Vector2D from './Vector2D';

export function ccw(p: Vector2D, a: Vector2D, b?: Vector2D): number {
  // parameter 가 2개 일때
  if (typeof b === 'undefined') {
    return p.cross(b);
  }
  //3개 일때
  else {
    return ccw(a.sub(p), b.sub(p));
  }
}

// 점 p 가 a, b 가 이루는 상자 안에(경계 지점 포함) 있는지 여부를 반환
export function isPointInBox(p: Vector2D, a: Vector2D, b: Vector2D): boolean {
  const max_x = Math.max(a.x, b.x);
  const min_x = Math.min(a.x, b.x);
  const max_y = Math.max(a.y, b.y);
  const min_y = Math.min(a.y, b.y);

  return p.x >= min_x && p.x <= max_x && p.y >= min_y && p.y <= max_y;
}

// a, b 가 이루는 선분과 c, d 가 이루는 선분이 서로 접촉하는 지 여부를 반환
export function segmentIntersects(
  a: Vector2D,
  b: Vector2D,
  c: Vector2D,
  d: Vector2D,
): boolean {
  const ab: number = ccw(a, b, c) * ccw(a, b, d);
  const cd: number = ccw(c, d, a) * ccw(c, d, b);

  if (ab == 0 && cd == 0) {
    if (b.ltTo(a)) [a, b] = [b, a];
    if (d.ltTo(c)) [c, d] = [d, c];

    return !(b.ltTo(c) || d.ltTo(a));
  }

  return ab >= 0 && cd <= 0;
}
