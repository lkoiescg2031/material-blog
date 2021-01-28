import Drawable from './Drawable';

import Collision from './Collision';
import { degToRadians } from '../../utils/math';
import options from './Options';
import User from './User';

interface Point {
  x?: number;
  y?: number;
}

export default class Bullet implements Drawable {
  // shape
  x: number;
  y: number;

  prevX: number;
  prevY: number;

  // state
  dir: number; // 움직이는 방향

  durability: number;
  isAlive: boolean;

  constructor(x: number, y: number, dir: number, durability: number) {
    //public
    this.setPos = this.setPos.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.setDir = this.setDir.bind(this);
    this.attacked = this.attacked.bind(this);
    this.update = this.update.bind(this);
    this.updateWallCollision = this.updateWallCollision.bind(this);
    this.draw = this.draw.bind(this);

    this.x = x;
    this.y = y;

    this.prevX = this.x;
    this.prevY = this.y;

    this.dir = dir;

    this.durability = durability;
    this.isAlive = durability !== 0;
  }

  setPos(pos: Point): void {
    this.x = pos.x || this.x;
    this.y = pos.y || this.y;
  }

  moveTo(pos: Point): void {
    this.prevX = this.x;
    this.prevY = this.y;

    this.setPos(pos);
  }
  setDir(dir: number) {
    this.dir = dir;
  }

  attacked(damage: number): void {
    this.durability -= damage;
    this.isAlive = this.durability !== 0;
  }

  update(): void {
    const { radius, speed } = options.game.bullets.bullet;
    this.moveTo({
      x: this.x + speed * 2 * radius * Math.cos(degToRadians(this.dir)),
      y: this.y + speed * 2 * radius * Math.sin(degToRadians(this.dir)),
    });
  }

  updateWallCollision(user: User): boolean {
    return Collision.Bullet2Wall(this, user);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isAlive) {
      const { color, radius } = options.game.bullets.bullet;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
}
