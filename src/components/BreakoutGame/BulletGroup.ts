import { degToRadians } from '../../utils/math';
import Bullet from './Bullet';
import options from './Options';

export default class BulletGroup {
  totalCouts: number;

  x: number;
  y: number;
  dir: number;
  durability: number;

  bullets: Bullet[];

  constructor(
    totalCouts: number,
    x: number,
    y: number,
    dir: number,
    durability: number,
  ) {
    this.totalCouts = totalCouts;

    this.x = x;
    this.y = y;
    this.dir = dir;

    this.durability = durability;

    this.bullets = [];
  }

  reset(): void {
    const { initialDistance, bullet } = options.game.bullets;
    const { radius } = bullet;
    const dx =
      initialDistance * radius * Math.cos(degToRadians(this.dir - 180));
    const dy =
      initialDistance * radius * Math.sin(degToRadians(this.dir - 180));

    this.bullets = new Array(this.totalCouts).fill(0).map(
      (_, index) =>
        new Bullet(
          this.x + dx * index, // x
          this.y + dy * index, // y
          this.dir, // dir
          this.durability, //durability
        ),
    );
  }

  update(): void {
    this.bullets.forEach(element => element.update());
  }

  forEach(
    callback: (element: Bullet, index: number, array: Bullet[]) => void,
  ): void {
    this.bullets.forEach(callback);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bullets.forEach(element => element.draw(ctx));
  }
}
