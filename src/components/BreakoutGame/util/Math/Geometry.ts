import { quadraticEquation } from './Equation';
import Vector2D from './Vector2D';

export function ccw(p: Vector2D, a: Vector2D, b?: Vector2D): number {
  // parameter 가 2개 일때
  if (typeof b === 'undefined') {
    return p.cross(a);
  }
  //3개 일때
  else {
    return ccw(a.sub(p), b.sub(p));
  }
}

// 점 p 가 a, b 가 이루는 상자 안에(경계 지점 제외) 있는지 여부를 반환
export function isPointInBox(p: Vector2D, a: Vector2D, b: Vector2D): boolean {
  const max_x = Math.max(a.x, b.x);
  const min_x = Math.min(a.x, b.x);
  const max_y = Math.max(a.y, b.y);
  const min_y = Math.min(a.y, b.y);

  return p.x > min_x && p.x < max_x && p.y > min_y && p.y < max_y;
}

// 두 직선의 교차 여부와 교차점을 반환
export function lineIntersection(
  a: Vector2D,
  b: Vector2D,
  c: Vector2D,
  d: Vector2D,
): { isIntersect: boolean; point?: Vector2D } {
  const det = b.sub(a).cross(d.sub(c));

  // 두 직선이 평행 인 경우
  if (Math.abs(det) < Number.EPSILON) {
    return { isIntersect: false };
  }
  // point = a + (b - a) * ((c-a).cross(d-c) / det)
  const point: Vector2D = a.add(b.sub(a).mul(c.sub(a).cross(d.sub(c)) / det));
  return { isIntersect: true, point };
}

// a, b와 c, d가 평행한 두 선분 일때 이들이 한점에서 겹치는 지 여부 반환
export function parallelSegments(
  a: Vector2D,
  b: Vector2D,
  c: Vector2D,
  d: Vector2D,
): { isIntersect: boolean; point?: Vector2D } {
  if (b.ltTo(a)) [a, b] = [b, a];
  if (d.ltTo(c)) [c, d] = [d, c];

  // 한 직선 위에 없거나 두 선분이 겹치지 않는 경우
  if (ccw(a, b, c) !== 0 || b.ltTo(c) || d.ltTo(a)) {
    return { isIntersect: false };
  }

  // 두 선분이 겹치므로 교점을 찾음
  if (a.ltTo(c)) {
    return { isIntersect: true, point: c.clone() };
  } else {
    return { isIntersect: true, point: a.clone() };
  }
}
// p, a, b 가 일직선 상에 있을 때
// p가 a, b 를 감싸면서 각 변이 x,y 축 위에 평행한 최소 사각형 내부에 있는지 확인
export function inBoundingRectangle(
  p: Vector2D,
  a: Vector2D,
  b: Vector2D,
): boolean {
  if (b.ltTo(a)) [a, b] = [b, a];
  return p.equalTo(a) || p.equalTo(b) || (a.ltTo(p) && p.ltTo(b));
}

// a,b 선분과 c, d 선분의 교점 p 를 반환
// 교점이 여려 개일 경우 아무점이나 반환
// 교차하지 않을 경우 false 반환
export function segmentIntersectsWithPoint(
  a: Vector2D,
  b: Vector2D,
  c: Vector2D,
  d: Vector2D,
): {
  isIntersect: boolean;
  point?: Vector2D;
} {
  // 두 직선이 평행 인 경우 처리
  const { isIntersect, point } = lineIntersection(a, b, c, d);
  if (!isIntersect) {
    return parallelSegments(a, b, c, d);
  }
  // p가 두 선분에 모두 포함 되어 있는 경우에만 참 반환
  else {
    const isInSegment: boolean =
      inBoundingRectangle(point, a, b) && inBoundingRectangle(point, c, d);

    if (isInSegment) {
      return { isIntersect: true, point };
    } else {
      return { isIntersect: false };
    }
  }
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
  // 두 선분이 한 직선 위에 있거나 끝점이 겹치는 경우
  if (ab == 0 && cd == 0) {
    if (b.ltTo(a)) [a, b] = [b, a];
    if (d.ltTo(c)) [c, d] = [d, c];

    return !(b.ltTo(c) || d.ltTo(a));
  }

  return ab <= 0 && cd <= 0;
}

// p 에서 A,B 직선에 내린 수선의 발 반환
export function perpendicularFoot(
  p: Vector2D,
  a: Vector2D,
  b: Vector2D,
): Vector2D {
  return a.add(p.sub(a).project(b.sub(a)));
}

// p 와 a,b 사이의 거리 반환
export function pointToLine(p: Vector2D, a: Vector2D, b: Vector2D): number {
  return p.sub(perpendicularFoot(p, a, b)).norm();
}

// pos에 위치한 공이 t 시간당 dir방향으로 이동했을 때
// 중심이 center 이고 반지름이 radius 인 원과 충돌하는 시간 t를 반환
export function hitCircleTime(
  here: Vector2D,
  dir: Vector2D,
  center: Vector2D,
  radius: number,
): number {
  const a = dir.dot(dir);
  const b = 2 * dir.dot(here.sub(center));
  const c =
    center.dot(center) +
    here.dot(here) -
    2 * here.dot(center) -
    radius * radius;

  const sol = quadraticEquation(a, b, c);
  if (sol.length === 0 || sol[0] < Number.EPSILON) {
    return Number.POSITIVE_INFINITY;
  }
  return sol[0];
}
// a 방향으로 이동중에 b가 중심인 원과 c 지점에서 충돌 했을 때 반사 방향
export function getReflectCircle(
  dir: Vector2D,
  center: Vector2D,
  hitPoint: Vector2D,
): Vector2D {
  // (a - (b.project(c-b) * 2)).normmalize()
  return dir.sub(dir.project(hitPoint.sub(center)).mul(2)).normalize();
}
