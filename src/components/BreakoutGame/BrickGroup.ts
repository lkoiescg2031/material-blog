import Brick from './Brick';
import Bullet from './Bullet';
import User from './User';
import Collision from './Collision';
import options from './Options';

export default class BrickGroup {
  //brickOptions
  brickY: number;
  totalColCount: number;
  brickDurability: number;

  bricks: Brick[];

  constructor(brickY: number, totalColCount: number, brickDurability: number) {
    this.collisionUpdate = this.collisionUpdate.bind(this);
    this.isAllDead = this.isAllDead.bind(this);
    this.draw = this.draw.bind(this);

    const { stage, bricks } = options.game;
    const { y, stageWidth } = stage;
    const { betweenSpace } = bricks;

    this.totalColCount = totalColCount;
    this.brickY = brickY;
    this.brickDurability = brickDurability;

    const brickWidth =
      (stageWidth - (this.totalColCount + 1) * betweenSpace) /
      this.totalColCount;

    this.bricks = new Array(this.totalColCount).fill(0).map(
      (_, index) =>
        new Brick(
          betweenSpace * (index + 1) + brickWidth * index, // x
          this.brickY + y, // y
          brickWidth, // width
          this.brickDurability, // durability
        ),
    );
  }

  collisionUpdate(bullet: Bullet, user: User): boolean {
    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];

      // 살아있는 경우 충돌
      if (brick.isAlive === false) {
        continue;
      }

      // 충돌 확인
      const isCollided = Collision.Bullet2Brick(bullet, brick, user);
      if (isCollided) {
        //충돌 업데이트
        brick.update();
        return true;
      }
    }

    return false;
  }

  isAllDead(): boolean {
    return this.bricks.reduce(
      (prevBool, element) => prevBool && !element.isAlive,
      true as boolean,
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bricks.forEach(element => element.draw(ctx));
  }
}
