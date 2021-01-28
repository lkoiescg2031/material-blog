import BrickGroup from './BrickGroup';
import Bullet from './Bullet';
import options from './Options';
import User from './User';

interface BrickGroupResetOption {
  rowSize?: number;
  colSize?: number;
  durability?: number;
  durabliityIncRate?: number;
}

export default class BrickGRoup2D {
  rowSize: number;
  colSize: number;

  durability: number;
  durabilityIncRate: number;

  bricks: BrickGroup[];

  constructor(options: BrickGroupResetOption = {}) {
    this.reset = this.reset.bind(this);
    this.levelUpdate = this.levelUpdate.bind(this);
    this.collisionUpdate = this.collisionUpdate.bind(this);
    this.isAllDead = this.isAllDead.bind(this);
    this.draw = this.draw.bind(this);
  }

  reset(resetOptions: BrickGroupResetOption = {}): void {
    const { bricks, stage } = options.game;

    //stage
    const { rowSize, colSize, durability, durabilityIncRate } = stage;

    //bricks
    const { betweenSpace, brick } = bricks;
    const { height } = brick;

    this.rowSize = resetOptions.rowSize || rowSize;
    this.colSize = resetOptions.colSize || colSize;

    this.durability = resetOptions.durability || durability;
    this.durabilityIncRate =
      resetOptions.durabliityIncRate || durabilityIncRate;

    this.bricks = new Array(this.rowSize).fill(0).map(
      (_, index) =>
        new BrickGroup(
          betweenSpace * (index + 1) + height * index, // y
          this.colSize, // col count
          this.durability, // durability
        ),
    );
  }

  levelUpdate(): void {
    //bricks
    const { betweenSpace, brick } = options.game.bricks;
    const { height } = brick;

    this.durability += this.durabilityIncRate;

    this.bricks = new Array(this.rowSize).fill(0).map(
      (_, index) =>
        new BrickGroup(
          betweenSpace * (index + 1) + height * index, // y
          this.colSize, // col count
          this.durability, // durability
        ),
    );
  }

  collisionUpdate(bullet: Bullet, user: User): boolean {
    for (let i = 0; i < this.bricks.length; i++) {
      const brickgroup = this.bricks[i];
      const isCollided = brickgroup.collisionUpdate(bullet, user);

      if (isCollided) {
        return true;
      }
    }

    return false;
  }

  isAllDead(): boolean {
    return this.bricks.reduce(
      (prevBool, element) => prevBool && element.isAllDead(),
      true as boolean,
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bricks.forEach(element => element.draw(ctx));
  }
}
