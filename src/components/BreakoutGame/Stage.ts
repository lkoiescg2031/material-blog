import options from './Options';

import BrickGroup2D from './BrickGroup2D';
import User from './User';

export default class Stage {
  // elements
  bricks: BrickGroup2D;
  user: User;

  // ability
  level: number;
  tryCount: number;

  constructor(user: User, bricks: BrickGroup2D) {
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.reset = this.reset.bind(this);

    this.___drawStage = this.___drawStage.bind(this);
    this.___drawInterface = this.___drawInterface.bind(this);
    this.user = user;
    this.bricks = bricks;
  }

  reset() {
    //TODO 스테이지 초기설정
    this.level = 1;
    this.tryCount = 10;
    this.bricks.reset();
  }

  //TODO 스테이지 레벨 업데이트
  update(): void {
    this.user.bullets.forEach(bullet => {
      //move update
      bullet.update();
      //check collision
      let isCollided: boolean = bullet.isAlive === false; //bullet 이 죽어있으면 충돌
      if (isCollided === false) {
        isCollided = bullet.updateWallCollision();
      }
      if (isCollided === false) {
        this.bricks.collisionUpdate(bullet);
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.___drawStage(ctx);
    this.___drawInterface(ctx);
    this.bricks.draw(ctx);
  }

  private ___drawStage(ctx: CanvasRenderingContext2D): void {
    const { y, stageWidth, stageHeight } = options.game.stage;
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
  }

  private ___drawInterface(ctx: CanvasRenderingContext2D): void {
    const { y, stageWidth, fontBig, fontSmall, fontColor } = options.game.stage;
    const centerX = stageWidth / 2;
    const tryCountStr = this.tryCount.toString().padStart(2, '0');

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
