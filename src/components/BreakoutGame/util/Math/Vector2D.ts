import { fmod } from './Number';

export default class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  //compare Func
  equalTo(rhs: Vector2D): boolean {
    return rhs.x === this.x && rhs.y === this.y;
  }

  ltTo(rhs: Vector2D): boolean {
    if (rhs.x === this.x) {
      return this.y < rhs.x;
    }
    return this.x < rhs.x;
  }

  // 사칙 연산
  add(rhs: Vector2D): Vector2D {
    const ret = rhs.clone();
    ret.x += this.x;
    ret.y += this.y;

    return ret;
  }

  sub(rhs: Vector2D): Vector2D {
    const ret = this.clone();
    ret.x -= rhs.x;
    ret.y -= rhs.y;
    return ret;
  }

  mul(rhs: number): Vector2D {
    return new Vector2D(this.x * rhs, this.y * rhs);
  }

  norm(): number {
    return Math.hypot(this.x, this.y);
  }

  normalize(): Vector2D {
    const norm = this.norm();
    return new Vector2D(this.x / norm, this.y / norm);
  }

  // x 축 양의 방향으로 부터 이 백터까지 반시계 방향으로 잰 각도
  polar(): number {
    return fmod(Math.atan2(this.y, this.x) + 2 * Math.PI, 2 * Math.PI);
  }

  //외적, 내적
  dot(rhs: Vector2D): number {
    return this.x * rhs.x + this.y * rhs.y;
  }

  cross(rhs: Vector2D): number {
    return this.x * rhs.y - rhs.x * this.y;
  }

  // 이 백터를 rhs 에 투영한 결과
  project(rhs: Vector2D): Vector2D {
    const r: Vector2D = rhs.normalize();
    return r.mul(r.dot(this));
  }

  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  static createByPolorCoord(radius: number, theta: number): Vector2D {
    const dx = radius * Math.cos((theta * Math.PI) / 180);
    const dy = radius * Math.sin((theta * Math.PI) / 180);

    return new Vector2D(dx, dy);
  }
}
