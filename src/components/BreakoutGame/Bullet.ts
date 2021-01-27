import Drawable from './Drawable';

import { degToRadians } from '../../utils/math';

interface Point {
  x?: number;
  y?: number;
}

export default class Bullet implements Drawable {
  // shape
  x: number;
  y: number;
  r: number;
  color: string;

  prevX: number;
  prevY: number;

  // state
  dir: number; // 움직이는 방향
  speed: number; // 속도 0 ~ 1
  durability: number;
  isAlive: boolean;

  constructor(
    x: number,
    y: number,
    r: number,
    color: string,
    dir: number,
    speed: number,
    durability: number,
  ) {
    //public
    this.setPos = this.setPos.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.setDir = this.setDir.bind(this);
    this.attacked = this.attacked.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;

    this.prevX = this.x;
    this.prevY = this.y;

    this.dir = dir;
    this.speed = speed;

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
  }

  update(): void {
    this.moveTo({
      x: this.x + this.speed * 2 * this.r * Math.cos(degToRadians(this.dir)),
      y: this.y + this.speed * 2 * this.r * Math.sin(degToRadians(this.dir)),
    });
    this.isAlive = this.durability !== 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isAlive) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
}
