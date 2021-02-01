import options from '../Options';
import Brick from './Brick';

export default class BrickGroup {
  rowSize: number;
  colSize: number;
  durability: number;

  bricks: Brick[][];

  constructor() {
    this.rowSize = 0;
    this.colSize = 0;
    this.durability = 0;
    this.bricks = [];
  }

  setSize(row: number, col: number): void {
    this.rowSize = row;
    this.colSize = col;
  }

  setDurability(durability: number): void {
    this.durability = Math.max(0, durability);
  }

  create(): void {
    // options
    const { stage, brick } = options.shape;
    const { stageWidth, scoreBoardHeight: startY } = stage;
    const { height, between } = brick;

    const width = (stageWidth - (this.colSize + 1) * between) / this.colSize;

    this.bricks = new Array(this.rowSize).fill(0).map((_, rowIdx) =>
      new Array(this.colSize).fill(0).map((_, colIdx) => {
        const brick = new Brick(
          (colIdx + 1) * between + colIdx * width, // x
          startY + (rowIdx + 1) * between + rowIdx * height, // y
          width, // width
          this.durability, // durabliity
        );
        return brick;
      }),
    );
  }

  getAliveCount(): number {
    let aliveCount = 0;

    this.___forEach(brick => {
      if (brick.isAlive === true) {
        aliveCount++;
      }
    });

    return aliveCount;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.___forEach(brick => brick.draw(ctx));
  }

  private ___forEach(
    callback: (element: Brick, rowIdx: number, colIdx: number) => void,
  ) {
    for (let rowIdx = 0; rowIdx < this.bricks.length; rowIdx++) {
      for (let colIdx = 0; colIdx < this.bricks[rowIdx].length; colIdx++) {
        callback(this.bricks[rowIdx][colIdx], rowIdx, colIdx);
      }
    }
  }
}
