import BrickGroup from './BrickGroup';
import Bullet from './Bullet';
import options from './Options';

export default class BrickGRoup2D {
  totalRowBrick: number;
  totalColBrick: number;

  brickDurability: number;

  brickGroups: BrickGroup[];

  constructor(rowCount: number, colCount: number, brickDurability: number) {
    this.reset = this.reset.bind(this);
    this.collisionUpdate = this.collisionUpdate.bind(this);
    this.draw = this.draw.bind(this);

    this.totalRowBrick = rowCount;
    this.totalColBrick = colCount;

    this.brickDurability = brickDurability;

    this.brickGroups = [];
  }

  reset(): void {
    const { betweenSpace, brick } = options.game.bricks;
    const { height } = brick;

    this.brickGroups = new Array(this.totalRowBrick).fill(0).map(
      (_, index) =>
        new BrickGroup(
          betweenSpace * (index + 1) + height * index, // y
          this.totalColBrick, // col count
          this.brickDurability, // durability
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
