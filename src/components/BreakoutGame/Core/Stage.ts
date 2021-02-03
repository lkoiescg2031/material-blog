import AbstractStage, { StageState } from './AbstractStage';

import BrickGroup from '../Objects/BrickGroup';
import BulletGroup from '../Objects/BulletGroup';
import User from '../Objects/User';

import Collision from './Collision';

import options from '../Options';
import Vector2D from '../util/Math/Vector2D';

export default class Stage extends AbstractStage {
  stageWidth: number;
  stageHeight: number;

  // ability
  level: number;
  tryCount: number;

  shootPos: Vector2D;
  movePosSpeed: number;
  shootDir: number;
  moveDirSpeed: number;

  // elements
  user: User;
  bricks: BrickGroup;
  bullets: BulletGroup;

  constructor(user: User, bullets: BulletGroup, bricks: BrickGroup) {
    super();
    this.user = user;
    this.bullets = bullets;
    this.bricks = bricks;

    const { radius } = options.shape.bullet;
    const { stageWidth, stageHeight, scoreBoardHeight } = options.shape.stage;
    const { speed } = options.shape.user;

    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight - scoreBoardHeight;
    this.shootPos = new Vector2D(0, stageHeight - radius);
    this.movePosSpeed = speed;
    this.shootDir = 180;
    this.moveDirSpeed = speed / 3;

    window.addEventListener('click', this.___eventHandler.bind(this));
  }

  setStage(level: number, tryCount: number): void {
    //시작 난이도 설정
    this.level = level;
    this.tryCount = tryCount;
  }

  onPrepared() {
    super.onPrepared();
    this.bricks.create();
  }

  protected onInitPos(): StageState {
    this.shootPos.x += this.movePosSpeed;

    if (this.shootPos.x >= this.stageWidth || this.shootPos.x <= 0) {
      this.movePosSpeed *= -1;
    }

    return 'initPos';
  }

  protected onInitDir(): StageState {
    this.shootDir += this.moveDirSpeed;

    if (this.shootDir <= 180 || this.shootDir >= 360) {
      this.moveDirSpeed *= -1;
    }

    return 'initDir';
  }

  protected onUpdateBullet(): StageState {
    // throw new Error('Method not implemented.');
    this.bullets.bullets.forEach(bullet => {
      bullet.updatePos();

      let isCollided: boolean = bullet.isAlive === false;

      // 총알이 이미 죽어있으면 벽과 충돌검사를 하지 않음
      if (isCollided) {
        return;
      }
      isCollided = Collision.Bullet2Wall(bullet, this.user);

      // 벽과 충돌한 적이 있으면 벽돌과 충돌 검사를 하지 않음
      if (isCollided) {
        return;
      }
      isCollided = Collision.Bullet2Bricks(bullet, this.bricks, this.user);
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

  private ___eventHandler() {
    if (this.isRunning === false) {
      return;
    } else if (this.curState === 'initPos') {
      this.bullets.setPos(this.shootPos.x, this.shootPos.y);
      this.curState = 'initDir';
    } else if (this.curState === 'initDir') {
      //FIXME 초기 발사 방향이 stage 밖으로 결정된 경우 발사 실패하도록 설정
      this.bullets.setDir(this.shootDir);
      this.bullets.shoot();
      this.curState = 'updateBullet';
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { stageColor, fontColor } = options.shape.stage;
    const { bigFont, smallFont } = options.shape.stage;
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

    //draw pos
    if (this.curState !== 'updateBullet') {
      const { radius } = options.shape.bullet;
      ctx.beginPath();
      ctx.fillStyle = stageColor;
      ctx.arc(this.shootPos.x, this.shootPos.y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }

    //draw dir
    if (this.curState === 'initDir') {
      const dx = this.stageHeight * Math.cos((this.shootDir * Math.PI) / 180);
      const dy = this.stageHeight * Math.sin((this.shootDir * Math.PI) / 180);

      ctx.beginPath();
      ctx.setLineDash([10, 3]);
      ctx.strokeStyle = stageColor;
      ctx.moveTo(this.shootPos.x, this.shootPos.y);
      ctx.lineTo(this.shootPos.x + dx, this.shootPos.y + dy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.closePath();
    }
  }
}
