import Drawable from './Drawable';

import Brick from './Brick';
import Bullet from './Bullet';
import Collision from './Collision';

export default class Stage implements Drawable {
  stageWidth: number;
  stageHeight: number;
  bullets: Bullet[];
  bricks: Brick[];

  constructor(
    stageWidth,
    stageHeight,
    bullets: Bullet[] = [],
    bricks: Brick[] = [],
  ) {
    //public
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.bullets = bullets;
    this.bricks = bricks;
  }

  update(): void {
    this.bullets.forEach(bullet => {
      //bullets update
      bullet.update();

      //check collision
      let isCollided: boolean = false;

      isCollided = Collision.Bullet2Wall(bullet, this);

      // this.bricks.forEach(bricks => Collision.Bullet2Brick(element, bricks));
    });
  }

  draw(ctx): void {
    this.bricks.forEach(element => element.draw(ctx));
    this.bullets.forEach(element => element.draw(ctx));
  }
}
