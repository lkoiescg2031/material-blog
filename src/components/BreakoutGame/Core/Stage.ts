import AbstractStage, { StageState } from './AbstractStage';

import BrickGroup2D from '../Objects/BrickGroup';
import User from '../Objects/User';
import BulletGroup from '../Objects/BulletGroup';

import options from '../Options';

export default class Stage extends AbstractStage {
  // ability
  level: number;
  tryCount: number;

  // elements
  user: User;
  bricks: BrickGroup2D;
  bullets: BulletGroup;

  constructor(user: User, bullets: BulletGroup, bricks: BrickGroup2D) {
    super();

    this.user = user;
    this.bullets = bullets;
    this.bricks = bricks;
  }

  setStage(level: number, tryCount: number): void {
    super.onInitialized();

    //시작 난이도 설정
    this.level = level;
    this.tryCount = tryCount;
  }

  //TODO : Pos 생성
  protected onInitPos(): StageState {
    const { stageWidth, stageHeight } = options.shape.stage;

    this.bullets.setPos(
      Math.floor(Math.random() * (stageWidth + 1)), // x
      stageHeight, // y
    );

    return 'initDir';
  }

  //TODO : Dir 생성
  protected onInitDir(): StageState {
    this.bullets.setDir(Math.floor(Math.random() * 181 + 180));
    this.bullets.shoot();

    return 'updateBullet';
  }

  protected onUpdateBullet(): StageState {
    // throw new Error('Method not implemented.');
    this.bullets.bullets.forEach(bullet => {
      bullet.updatePos();

      let isCollided: boolean = bullet.isAlive === false;

      // // 총알이 이미 죽어있으면 벽과 충돌검사를 하지 않음
      // if (isCollided) {
      //   return;
      // }
      // isCollided = bullet.updateWallCollision(this.user);

      // // 벽과 충돌한 적이 있으면 벽돌과 충돌 검사를 하지 않음
      // if (isCollided) {
      //   return;
      // }
      // this.bricks.collisionUpdate(bullet, this.user);
    });

    if (this.bullets.getAliveCounts() === 0) {
      this.tryCount -= 1;
      return 'initPos';
    } else if (this.bricks.getAliveCount() === 0) {
      return 'initPos';
    } else {
      return 'updateBullet';
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { bigFont, smallFont, fontColor } = options.shape.stage;
    const { scoreBoardHeight: y, stageWidth } = options.shape.stage;

    const pad = 2;
    const centerX = stageWidth / 2;
    const tryCountStr = this.tryCount.toString().padStart(pad, '0');

    //Stage 기본 형태
    super.draw(ctx);

    //draw level
    ctx.beginPath();
    ctx.font = bigFont;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`level ${this.level}`, centerX, y / 2, stageWidth);
    ctx.closePath();

    //draw try
    ctx.beginPath();
    ctx.font = smallFont;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`try ${tryCountStr}`, centerX, y - 8, stageWidth);
    ctx.closePath();
  }
}
