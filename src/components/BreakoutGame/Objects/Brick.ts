import Vector2D from '../util/Math/Vector2D';
import options from '../Options';
import { toFormatString } from '../util/string';

export default class Brick {
  //shape
  pos: Vector2D;
  centerPos: Vector2D;
  width: number;

  //state
  durability: number;
  isAlive: boolean;

  index: [number, number];

  constructor(
    x: number,
    y: number,
    width: number,
    durability: number,
    index: [number, number],
  ) {
    const { height } = options.shape.brick;

    this.index = index;

    this.pos = new Vector2D(x, y);
    this.width = width;

    this.setDurability(durability);

    this.centerPos = new Vector2D(
      this.pos.x + width / 2, // x
      this.pos.y + height / 2, // y
    );
  }

  setDurability(durability: number) {
    this.durability = Math.max(0, durability);
    this.isAlive = this.durability !== 0;
  }

  attacked(damaged: number) {
    this.setDurability(this.durability - damaged);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isAlive === false) {
      return;
    }

    const { height, color, fontColor, font } = options.shape.brick;

    ctx.beginPath();

    //draw brick
    ctx.fillStyle = color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, height);

    //draw text
    ctx.font = font;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      toFormatString(this.durability),
      this.centerPos.x,
      this.centerPos.y,
      this.width,
    );

    ctx.closePath();
  }
}
