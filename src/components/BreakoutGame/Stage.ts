import Drawable from './Drawable';

import Collision from './Collision';
import BulletGroup from './BulletGroup';
import BrickGroup2D from './BrickGroup2D';

export default class Stage implements Drawable {
  stageWidth: number;
  stageHeight: number;
  bullets: BulletGroup;
  bricks: BrickGroup2D;

  constructor(
    stageWidth,
    stageHeight,
    bullets: BulletGroup,
    bricks: BrickGroup2D,
  ) {
    //public
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.bullets = bullets;
    this.bricks = bricks;
  }

  // reset() {
  //   this.bricks.reset();
  //   this.bullets.reset();
  // }

  update(): void {
    // this.bullets.update();
    this.bullets.forEach(bullet => {
      //bullets update
      bullet.update();

      //check collision
      let isCollided: boolean = false;

      isCollided = Collision.Bullet2Wall(bullet, this);

      this.bricks.collisionUpdate(bullet);
    });
  }

  draw(ctx): void {
    this.bricks.draw(ctx);
    this.bullets.draw(ctx);
  }
}
