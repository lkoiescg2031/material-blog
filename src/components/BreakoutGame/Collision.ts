import Bullet from './Bullet';
import Stage from './Stage';
import Brick from './Brick';

import { isIntersection, substractDeg } from '../../utils/math';

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

//TODO Add corner collision
function Bullet2Brick(bullet: Bullet, brick: Brick): boolean {
  const brickTopY = brick.y;
  const brickBottomY = brick.y + brick.height;
  const brickLeftX = brick.x;
  const brickRightX = brick.x + brick.width;

  const collisionOutLineTopY = brickTopY - bullet.r;
  const collisionOutLineBottomY = brickBottomY + bullet.r;
  const collisionOutLineLeftX = brickLeftX - bullet.r;
  const collisionOutLineRightX = brickRightX + bullet.r;

  const bulletPrevPos = { x: bullet.prevX, y: bullet.prevY }; // 이동 전 총알 위치
  const bulletCurPos = { x: bullet.x, y: bullet.y }; // 이동 후 총알 위치

  //brick's top
  if (
    collisionOutLineTopY > bullet.prevY &&
    isIntersection(
      bulletPrevPos,
      bulletCurPos,
      { x: brickLeftX, y: collisionOutLineTopY },
      { x: brickRightX, y: collisionOutLineTopY },
    )
  ) {
    //bullet collision
    bullet.moveTo({ y: collisionOutLineTopY });
    bullet.setDir(substractDeg(360, bullet.dir));
    //brick collision
    brick.attacked(1);

    return true;
  }
  //brickt's bottom
  else if (
    collisionOutLineBottomY < bullet.prevY &&
    isIntersection(
      bulletPrevPos,
      bulletCurPos,
      { x: brickLeftX, y: collisionOutLineBottomY },
      { x: brickRightX, y: collisionOutLineBottomY },
    )
  ) {
    //bullet collision
    bullet.moveTo({ y: collisionOutLineBottomY });
    bullet.setDir(substractDeg(360, bullet.dir));
    //brick collision
    brick.attacked(1);

    return true;
  }
  //brick's left
  else if (
    collisionOutLineLeftX > bullet.prevX &&
    isIntersection(
      bulletPrevPos,
      bulletCurPos,
      { x: collisionOutLineLeftX, y: brickTopY },
      { x: collisionOutLineLeftX, y: brickBottomY },
    )
  ) {
    //bullet's collision
    bullet.moveTo({ x: collisionOutLineLeftX });
    bullet.setDir(substractDeg(180, bullet.dir));
    //brick's collision
    brick.attacked(1);

    return true;
  }
  //brick's right
  else if (
    collisionOutLineRightX < bullet.prevX &&
    isIntersection(
      bulletPrevPos,
      bulletCurPos,
      { x: collisionOutLineRightX, y: brickTopY },
      { x: collisionOutLineRightX, y: brickBottomY },
    )
  ) {
    //bullet's collision
    bullet.moveTo({ x: collisionOutLineRightX });
    bullet.setDir(substractDeg(180, bullet.dir));
    //brick's collision
    brick.attacked(1);

    return true;
  }
  // no collision
  else {
    return false;
  }
}

export default {
  Bullet2Wall,
  Bullet2Brick,
};
