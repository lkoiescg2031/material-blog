import Drawable from './Drawable';
import options from './Options';

export default class Brick implements Drawable {
  //shape
  x: number;
  y: number;
  width: number;
  centerX: number;
  centerY: number;

  //state
  durability: number;
  isAlive: boolean;

  constructor(x: number, y: number, width: number, durability: number) {
    this.attacked = this.attacked.bind(this);
    this.isIn = this.isIn.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    const { height } = options.game.bricks.brick;

    this.x = x;
    this.y = y;
    this.width = width;

    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + height / 2;
    //state
    this.durability = durability;
    this.isAlive = this.durability !== 0;
  }

  attacked(damage: number): void {
    this.durability -= damage;
  }

  //TODO 함수 위치 리팩토링 요청
  isIn(x: number, y: number): boolean {
    const { height } = options.game.bricks.brick;

    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + height
    );
  }

  update(): void {
    this.durability = Math.max(this.durability, 0);
    this.isAlive = this.durability !== 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isAlive) {
      const { height, color, fontColor, font } = options.game.bricks.brick;

      ctx.beginPath();

      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, height);

      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = fontColor;
      ctx.fillText(
        this.durability.toString(),
        this.centerX,
        this.centerY,
        this.width,
      );

      ctx.closePath();
    }
  }
}
