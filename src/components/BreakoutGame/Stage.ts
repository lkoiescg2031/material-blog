import Drawable from './Drawable';

import options from './Options';

import User from './User';
import BulletGroup from './BulletGroup';
import BrickGroup2D from './BrickGroup2D';

export default class Stage implements Drawable {
  user: User;
  bullets: BulletGroup;
  bricks: BrickGroup2D;

  constructor(user: User, bullets: BulletGroup, bricks: BrickGroup2D) {
    //public
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.user = user;
    this.bullets = bullets;
    this.bricks = bricks;
  }

  update(): void {
    this.bullets.forEach(bullet => {
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
    this.___drawOutLine(ctx);
    this.user.draw(ctx);
    this.bricks.draw(ctx);
    this.bullets.draw(ctx);
  }

  private ___drawOutLine(ctx: CanvasRenderingContext2D): void {
    const { stageWidth, stageHeight } = options.game.stage;

    ctx.beginPath();
    ctx.fillStyle = options.game.stage.outLineColor;
    ctx.lineWidth = options.game.stage.outLineWidth;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, stageHeight);
    ctx.lineTo(stageWidth, stageHeight);
    ctx.lineTo(stageWidth, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.closePath();
  }
}
