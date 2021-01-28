import BrickGroup from './BrickGroup';
import Bullet from './Bullet';
import options from './Options';

interface BrickGroupResetOption {
  rowSize?: number;
  colSize?: number;
  durability?: number;
}

export default class BrickGRoup2D {
  rowSize: number;
  colSize: number;

  durability: number;

  bricks2D: BrickGroup[];

  constructor(options: BrickGroupResetOption = {}) {
    this.reset = this.reset.bind(this);
    this.collisionUpdate = this.collisionUpdate.bind(this);
    this.draw = this.draw.bind(this);

    this.reset(options);

    this.bricks2D = [];
  }

  reset(resetOptions: BrickGroupResetOption = {}): void {
    const { bricks, stage } = options.game;

    //stage
    const { rowSize, colSize, durability } = stage;

    //bricks
    const { betweenSpace, brick } = bricks;
    const { height } = brick;

    this.rowSize = resetOptions.rowSize || rowSize;
    this.colSize = resetOptions.colSize || colSize;

    this.durability = resetOptions.durability || durability;

    this.bricks2D = new Array(this.rowSize).fill(0).map(
      (_, index) =>
        new BrickGroup(
          betweenSpace * (index + 1) + height * index, // y
          this.colSize, // col count
          this.durability, // durability
        ),
    );
  }

  collisionUpdate(bullet: Bullet): boolean {
    for (let i = 0; i < this.bricks2D.length; i++) {
      const brickgroup = this.bricks2D[i];
      const isCollided = brickgroup.collisionUpdate(bullet);

      if (isCollided) {
        return true;
      }
    }

    return false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bricks2D.forEach(element => element.draw(ctx));
  }
}
