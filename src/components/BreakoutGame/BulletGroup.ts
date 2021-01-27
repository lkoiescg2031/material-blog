import { degToRadians } from '../../utils/math';
import Bullet from './Bullet';

export default class BulletGroup {
  totalCouts: number;

  x: number;
  y: number;
  r: number;
  color: string;
  dir: number;
  speed: number;

  bullets: Bullet[];

  constructor(
    totalCouts: number,
    x: number,
    y: number,
    r: number,
    color: string,
    dir: number,
    speed: number,
  ) {
    this.totalCouts = totalCouts;

    this.x = x;
    this.y = y;
    this.r = r;
    this.dir = dir;

    this.color = color;
    this.speed = speed;

    this.bullets = [];
  }

  reset(): void {
    const dx = 3 * this.r * Math.cos(degToRadians(this.dir - 180));
    const dy = 3 * this.r * Math.sin(degToRadians(this.dir - 180));

    this.bullets = new Array(this.totalCouts).fill(0).map(
      (_, index) =>
        new Bullet(
          this.x + dx * index, // x
          this.y + dy * index, // y
          this.r, // r
          this.color, // color
          this.dir, // dir
          this.speed, // speed
        ),
    );
  }

  update(): void {
    this.bullets.forEach(element => element.update());
  }

  // TODO bullet Collision
  updateCollision(bullet: Bullet): void {}

  forEach(
    callback: (element: Bullet, index: number, array: Bullet[]) => void,
  ): void {
    this.bullets.forEach(callback);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bullets.forEach(element => element.draw(ctx));
  }
}
