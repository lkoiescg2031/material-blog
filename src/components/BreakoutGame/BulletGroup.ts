import { degToRadians } from '../../utils/math';
import Bullet from './Bullet';
import options from './Options';

interface BulletGroupOptions {
  total?: number;
  x?: number;
  y?: number;
  dir?: number;
  durability?: number;
}

export default class BulletGroup {
  total: number;

  x: number;
  y: number;
  dir: number;
  durability: number;

  bullets: Bullet[];

  constructor(options: BulletGroupOptions = {}) {
    this.reset = this.reset.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.reset(options);
  }

  reset(resetOptions: BulletGroupOptions = {}): void {
    const { bullets } = options.game;
    const { initialDistance, bullet } = bullets;
    const { radius } = bullet;

    this.total = resetOptions.total || bullets.defaultTotal;

    this.x = resetOptions.x || bullets.defaultX;
    this.y = resetOptions.y || bullets.defaultY;
    this.dir = resetOptions.dir || bullets.defaultDir;

    this.durability = resetOptions.durability || bullets.defaultDurability;

    const dx =
      initialDistance * radius * Math.cos(degToRadians(this.dir - 180));
    const dy =
      initialDistance * radius * Math.sin(degToRadians(this.dir - 180));

    this.bullets = new Array(this.total).fill(0).map(
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

  draw(ctx: CanvasRenderingContext2D): void {
    this.bullets.forEach(element => element.draw(ctx));
  }

  //forwarding
  forEach(
    callback: (element: Bullet, index: number, array: Bullet[]) => void,
  ): void {
    this.bullets.forEach(callback);
  }
}
