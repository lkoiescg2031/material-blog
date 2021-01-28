import Drawable from './Drawable';

import options from './Options';

import User from './User';
import BulletGroup from './BulletGroup';
import BrickGroup2D from './BrickGroup2D';

export default class Stage implements Drawable {
  // elements
  user: User;
  bricks: BrickGroup2D;

  // ability
  level: number;
  tryCount: number;

  constructor(user: User, bricks: BrickGroup2D) {
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.reset = this.reset.bind(this);

    this.user = user;
    this.bricks = bricks;
  }

  reset() {
    //TODO 스테이지 초기설정
    this.bricks.reset();
  }

  //TODO 스테이지 진행
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
    this.user.draw(ctx);
    this.bricks.draw(ctx);
    this.user.bullets.draw(ctx);
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
}
