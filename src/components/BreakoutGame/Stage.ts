import options from './Options';

import BrickGroup2D from './BrickGroup2D';
import User from './User';
import BulletGroup from './BulletGroup';
import { GameState } from './GameState';

type StageState = 'initPos' | 'initDir' | 'updateBullet';

export default class Stage {
  //status
  stageState: StageState;
  // elements
  user: User;
  bricks: BrickGroup2D;
  bullets: BulletGroup;

  // ability
  level: number;
  tryCount: number;
  tryCountIncRate: number;

  constructor(user: User, bullets: BulletGroup, bricks: BrickGroup2D) {
    // datas
    this.initialize = this.initialize.bind(this);
    this.ready = this.ready.bind(this);
    this.prepareStage = this.prepareStage.bind(this);
    this.___updateStage = this.___updateStage.bind(this);
    this.runStage = this.runStage.bind(this);
    this.___initPos = this.___initPos.bind(this);
    this.___initDir = this.___initDir.bind(this);
    this.___updateBullet = this.___updateBullet.bind(this);
    // views
    this.draw = this.draw.bind(this);
    this.___drawStage = this.___drawStage.bind(this);

    this.user = user;
    this.bullets = bullets;
    this.bricks = bricks;
  }

  /**
   * ===========================================
   * =============   DATA PART    ==============
   * ===========================================
   */
  initialize(): GameState {
    //시작 난이도 설정
    this.level = 0;
    this.tryCount = 5;
    this.tryCountIncRate = 5;

    this.user.reset();
    this.bullets.reset();
    this.bricks.reset();

    return 'ready';
  }

  //TODO 게임 시작 대기 관련 데이터 초기화
  ready(): GameState {
    return 'prepareStage';
  }

  prepareStage(): GameState {
    this.___updateStage();
    this.user.levelUpdate();
    this.bricks.levelUpdate();
    return 'runStage';
  }

  ___updateStage(): void {
    this.level += 1;
    this.tryCount += this.tryCountIncRate;
    this.stageState = 'initPos';
  }

  runStage(): GameState {
    switch (this.stageState) {
      default:
      case 'initPos':
        this.stageState = this.___initPos();
        break;
      case 'initDir':
        this.stageState = this.___initDir();
        break;
      case 'updateBullet':
        this.stageState = this.___updateBullet();
        break;
    }

    if (this.tryCount <= 0) {
      return 'initialize';
    } else if (this.bricks.isAllDead()) {
      return 'prepareStage';
    } else {
      return 'runStage';
    }
  }

  //TODO 총알 슈칭 위치 설정
  ___initPos(): StageState {
    const { stageWidth } = options.game.stage;
    this.user.posX = Math.floor(Math.random() * (stageWidth + 1));
    return 'initDir';
  }

  //TODO 총알 방향 설정
  ___initDir(): StageState {
    this.user.dir = Math.floor(Math.random() * 181 + 180);
    this.bullets.reset({
      x: this.user.posX,
      dir: this.user.dir,
      total: this.user.totalBall,
      durability: this.user.durability,
    });
    return 'updateBullet';
  }

  ___updateBullet(): StageState {
    this.bullets.forEach(bullet => {
      bullet.update();

      let isCollided: boolean = bullet.isAlive === false;

      // 총알이 이미 죽어있으면 벽과 충돌검사를 하지 않음
      if (isCollided) {
        return;
      }
      isCollided = bullet.updateWallCollision(this.user);

      // 벽과 충돌한 적이 있으면 벽돌과 충돌 검사를 하지 않음
      if (isCollided) {
        return;
      }
      this.bricks.collisionUpdate(bullet, this.user);
    });

    if (this.bullets.isAllDead()) {
      this.tryCount -= 1;
      return 'initPos';
    } else if (this.bricks.isAllDead()) {
      return 'initPos';
    } else {
      return 'updateBullet';
    }
  }

  /**
   * ===========================================
   * =============   VIEW PART    ==============
   * ===========================================
   */
  draw(ctx: CanvasRenderingContext2D): void {
    this.___drawStage(ctx);
    //draw elements
    this.bricks.draw(ctx);
    this.bullets.draw(ctx);
    this.user.draw(ctx);
  }

  private ___drawStage(ctx: CanvasRenderingContext2D): void {
    //options
    const { y, stageWidth, stageHeight } = options.game.stage;
    const { fontBig, fontSmall, fontColor } = options.game.stage;

    const pad = 2;
    const centerX = stageWidth / 2;
    const tryCountStr = this.tryCount.toString().padStart(pad, '0');

    // outter line
    ctx.beginPath();
    ctx.strokeStyle = options.game.stage.stageColor;
    ctx.lineWidth = options.game.stage.outLineWidth;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, stageHeight);
    ctx.lineTo(stageWidth, stageHeight);
    ctx.lineTo(stageWidth, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.closePath();

    // interface board
    ctx.beginPath();
    ctx.fillStyle = options.game.stage.stageColor;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, y);
    ctx.lineTo(stageWidth, y);
    ctx.lineTo(stageWidth, 0);
    ctx.fill();
    ctx.closePath();

    //draw level
    ctx.beginPath();
    ctx.font = fontBig;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`level ${this.level}`, centerX, y / 2, stageWidth);
    ctx.closePath();

    //draw try
    ctx.beginPath();
    ctx.font = fontSmall;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`try ${tryCountStr}`, centerX, y - 8, stageWidth);
    ctx.closePath();
  }
}
