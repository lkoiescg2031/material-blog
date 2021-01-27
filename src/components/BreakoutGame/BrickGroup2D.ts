import BrickGroup from './BrickGroup';
import Bullet from './Bullet';

export default class BrickGRoup2D {
  stageWidth: number;

  totalRowBrick: number;
  totalColBrick: number;

  brickHeight: number;
  brickSpace: number;
  brickDurability: number;

  brickColor: [string, string];
  brickFont: string;

  brickGroups: BrickGroup[];

  constructor(
    stageWidth: number,
    rowCount: number,
    colCount: number,
    brickHeight: number,
    brickSpace: number,
    brickDurability: number,
    brickColor: [string, string],
    brickFont: string,
  ) {
    this.reset = this.reset.bind(this);
    this.collisionUpdate = this.collisionUpdate.bind(this);
    this.draw = this.draw.bind(this);

    this.stageWidth = stageWidth;

    this.totalRowBrick = rowCount;
    this.totalColBrick = colCount;

    this.brickHeight = brickHeight;
    this.brickSpace = brickSpace;
    this.brickDurability = brickDurability;

    this.brickColor = brickColor;
    this.brickFont = brickFont;

    this.brickGroups = [];
  }

  reset(): void {
    this.brickGroups = new Array(this.totalRowBrick).fill(0).map(
      (_, index) =>
        new BrickGroup(
          this.stageWidth, // stageWidth
          this.brickSpace * (index + 1) + this.brickHeight * index, // brickY
          this.brickHeight, // brickHeight
          this.brickColor, //brickColor
          this.brickFont, // brickfont
          this.brickDurability, //brickDurability
          this.totalColBrick, // col count
          this.brickSpace, // brick horizontal space
        ),
    );
  }

  collisionUpdate(bullet: Bullet): boolean {
    for (let i = 0; i < this.brickGroups.length; i++) {
      const brickgroup = this.brickGroups[i];
      const isCollided = brickgroup.collisionUpdate(bullet);

      if (isCollided) {
        return true;
      }
    }

    return false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.brickGroups.forEach(element => element.draw(ctx));
  }
}
