import Brick from './Brick';
import Bullet from './Bullet';
import Collision from './Collision';

export default class BrickGroup {
  stageWidth: number;

  //brickOptions
  brickY: number;
  brickHeight: number;
  brickColor: [string, string];
  brickfont: string;
  brickDurability: number;
  totalBricks: number;
  betweenSpace: number;

  brickWidth: number;
  bricks: Brick[];

  constructor(
    stageWidth: number,
    brickY: number,
    brickHeight: number,
    brickColor: [string, string],
    brickfont: string,
    brickDurability: number,
    totalBricks: number,
    betweenSpace: number,
  ) {
    this.collisionUpdate = this.collisionUpdate.bind(this);
    this.draw = this.draw.bind(this);

    this.stageWidth = stageWidth;

    this.betweenSpace = betweenSpace;
    this.totalBricks = totalBricks;
    this.brickY = brickY;
    this.brickHeight = brickHeight;
    this.brickColor = brickColor;
    this.brickfont = brickfont;
    this.brickDurability = brickDurability;

    this.brickWidth =
      (this.stageWidth - (this.totalBricks + 1) * this.betweenSpace) /
      this.totalBricks;

    this.bricks = new Array(this.totalBricks)
      .fill(0)
      .map(
        (_, index) =>
          new Brick(
            this.betweenSpace * (index + 1) + this.brickWidth * index,
            this.brickY,
            this.brickWidth,
            this.brickHeight,
            this.brickColor,
            this.brickfont,
            this.brickDurability,
          ),
      );
  }

  collisionUpdate(bullet: Bullet): boolean {
    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];

      // 살아있는 경우 충돌
      if (brick.isAlive === false) {
        continue;
      }

      // 충돌 확인
      const isCollided = Collision.Bullet2Brick(bullet, brick);
      if (isCollided) {
        //충돌 업데이트
        brick.update();
        return true;
      }
    }

    return false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bricks.forEach(element => element.draw(ctx));
  }
}
