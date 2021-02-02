import Vector2D from '../util/Math/Vector2D';
import options from '../Options';
import Bullet from './Bullet';

export default class BulletGroup {
  size: number;
  bounce: number;

  pos: Vector2D;
  dir: number;

  bullets: Bullet[];

  constructor() {
    this.size = 0;
    this.bounce = 0;

    this.pos = new Vector2D(0, 0);
    this.dir = 180;

    this.bullets = [];
  }

  setSize(size: number): void {
    this.size = size;
  }

  setBounce(bounce: number): void {
    this.bounce = bounce;
  }

  setPos(x: number, y: number): void {
    this.pos.x = x;
    this.pos.y = y;
  }

  setDir(degree: number): void {
    this.dir = degree;
  }

  shoot(): void {
    const { radius } = options.shape.bullet;
    const dirVector = Vector2D.createByPolorCoord(radius * 2, this.dir);

    this.bullets = new Array(this.size).fill(0).map(
      (_, index) =>
        new Bullet(
          this.pos.x - dirVector.x * index, // x
          this.pos.y - dirVector.y * index, // y
          this.dir, // direction; unit: degree
          this.bounce, // bounce
          index,
        ),
    );
  }

  getAliveCounts(): number {
    return this.bullets.reduce(
      (acc, bullet) => acc + (bullet.isAlive ? 1 : 0),
      0,
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bullets.forEach(bullet => bullet.draw(ctx));
  }
}
