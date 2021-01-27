import Bullet from './Bullet';
import Stage from './Stage';
import Brick from './Brick';

import { substractDeg } from '../../utils/math';

function Bullet2Wall(bullet: Bullet, stage: Stage): boolean {
  //left
  if (bullet.x - bullet.r <= 0) {
    bullet.x = bullet.r;
    bullet.dir = substractDeg(180, bullet.dir);
    return true;
  }
  //right
  else if (bullet.x + bullet.r >= stage.stageWidth) {
    bullet.x = stage.stageWidth - bullet.r;
    bullet.dir = substractDeg(180, bullet.dir);
    return true;
  }
  //top
  else if (bullet.y - bullet.r <= 0) {
    bullet.y = bullet.r;
    bullet.dir = substractDeg(360, bullet.dir);
    return true;
  }
  //bottom
  else if (bullet.y + bullet.r >= stage.stageHeight) {
    bullet.y = stage.stageHeight - bullet.r;
    bullet.dir = substractDeg(360, bullet.dir);
    return true;
  } else {
    return false;
  }
}

function Bullet2Brick(bullet: Bullet, brick: Brick): boolean {
  // //element's left
  // if (
  //   brick.x >= bullet.prevX && // bullet is left of brick
  //   brick.isIn(bullet.x - bullet.r, bullet.y)
  // ) {
  //   //collision bullet
  //   bullet.x = brick.x + brick.width + bullet.r;
  //   bullet.dir = substractDeg(180, bullet.dir);
  //   //collision brick
  //   brick.update();
  //   return true;
  // }
  // //element's right
  // else if (
  //   brick.x + brick.width <= bullet.prevX &&
  //   brick.isIn(bullet.x + bullet.r, bullet.y)
  // ) {
  //   bullet.x = brick.x - bullet.r;
  //   bullet.dir = substractDeg(180, bullet.dir);
  //   brick.update();
  //   return true;
  // }
  // //element's top
  // else if (
  //   brick.y >= bullet.prevY &&
  //   brick.isIn(bullet.x, bullet.y + bullet.r)
  // ) {
  //   bullet.y = brick.y - bullet.r;
  //   bullet.dir = substractDeg(360, bullet.dir);
  //   brick.update();
  //   return true;
  // }
  // //element's bottom
  // else if (
  //   brick.y + brick.height <= bullet.prevY &&
  //   brick.isIn(bullet.x, bullet.y - bullet.r)
  // ) {
  //   bullet.y = brick.y + brick.height + bullet.r;
  //   bullet.dir = substractDeg(360, bullet.dir);
  //   brick.update();
  //   return true;
  // } else {
  //   return false;
  // }
}

export default {
  Bullet2Wall,
  Bullet2Brick,
};
