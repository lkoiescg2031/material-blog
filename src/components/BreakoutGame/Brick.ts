import Drawable from './Drawable';

export default class Brick implements Drawable {
  //shape
  x: number;
  y: number;
  width: number;
  height: number;
  color: [string, string];
  font: string;
  centerX: number;
  centerY: number;

  //state
  durability: number;
  isAlive: boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: [string, string],
    font: string,
    durability: number,
  ) {
    this.attacked = this.attacked.bind(this);
    this.isIn = this.isIn.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.font = font;

    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    //state
    this.durability = durability;
    this.isAlive = this.durability !== 0;
  }

  attacked(damage: number): void {
    this.durability -= damage;
  }

  isIn(x: number, y: number): boolean {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  update(): void {
    this.durability = Math.max(this.durability, 0);
    this.isAlive = this.durability !== 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isAlive) {
      ctx.beginPath();

      ctx.fillStyle = this.color[0];
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.font = this.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = this.color[1];
      ctx.fillText(
        this.durability.toString(),
        this.centerX,
        this.y,
        this.width,
      );

      ctx.closePath();
    }
  }
}
