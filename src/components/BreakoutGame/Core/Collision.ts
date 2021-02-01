import User from '../Objects/User';
import Bullet from '../Objects/Bullet';
import Brick from '../Objects/Brick';
import options from '../Options';

//FIXME bullet이 스테이지로 진입할 때 벽과 충돌하는 현상 발생
function Bullet2Wall(bullet: Bullet, user: User): boolean {
  const { y, stageWidth, stageHeight } = options.shape.stage;
  const { radius } = options.shape.bullet;
  //left
  if (bullet.curPos.x - radius <= 0) {
    bullet.x = radius;
    bullet.dir = substractDeg(180, bullet.dir);

    user.score += 1;
    return true;
  }
  //right
  else if (bullet.x + radius >= stageWidth) {
    bullet.x = stageWidth - radius;
    bullet.dir = substractDeg(180, bullet.dir);

    user.score += 1;
    return true;
  }
  //top
  else if (bullet.y - radius <= y) {
    bullet.y = y + radius;
    bullet.dir = substractDeg(360, bullet.dir);

    user.score += 1;
    return true;
  }
  //bottom
  else if (bullet.y + radius >= stageHeight) {
    const { weakness } = options.game.bullets.bullet;

    bullet.y = stageHeight - radius;
    bullet.dir = substractDeg(360, bullet.dir);
    bullet.attacked(weakness);

    user.score += 1;
    return true;
  } else {
    return false;
  }
}

// //FIXME Add corner collision
// function Bullet2Brick(bullet: Bullet, brick: Brick, user: User): boolean {
//   const { bricks, bullets } = options.game;
//   const { radius } = bullets.bullet;
//   const { height, weakness } = bricks.brick;

//   //out line
//   const brickTopY = brick.y;
//   const brickBottomY = brick.y + height;
//   const brickLeftX = brick.x;
//   const brickRightX = brick.x + brick.width;

//   //collision line
//   const collisionOutLineTopY = brickTopY - radius;
//   const collisionOutLineBottomY = brickBottomY + radius;
//   const collisionOutLineLeftX = brickLeftX - radius;
//   const collisionOutLineRightX = brickRightX + radius;

//   // bullet pos
//   const bulletPrevPos = { x: bullet.prevX, y: bullet.prevY }; // 이동 전 총알 위치
//   const bulletCurPos = { x: bullet.x, y: bullet.y }; // 이동 후 총알 위치

//   //brick's top
//   if (
//     collisionOutLineTopY > bullet.prevY &&
//     isIntersection(
//       bulletPrevPos,
//       bulletCurPos,
//       { x: brickLeftX, y: collisionOutLineTopY },
//       { x: brickRightX, y: collisionOutLineTopY },
//     )
//   ) {
//     //bullet collision
//     bullet.moveTo({ y: collisionOutLineTopY });
//     bullet.setDir(substractDeg(360, bullet.dir));
//     //brick collision
//     brick.attacked(weakness);
//     //user
//     user.score += 10;

//     return true;
//   }
//   //brickt's bottom
//   else if (
//     collisionOutLineBottomY < bullet.prevY &&
//     isIntersection(
//       bulletPrevPos,
//       bulletCurPos,
//       { x: brickLeftX, y: collisionOutLineBottomY },
//       { x: brickRightX, y: collisionOutLineBottomY },
//     )
//   ) {
//     //bullet collision
//     bullet.moveTo({ y: collisionOutLineBottomY });
//     bullet.setDir(substractDeg(360, bullet.dir));
//     //brick collision
//     brick.attacked(weakness);
//     //user
//     user.score += 10;

//     return true;
//   }
//   //brick's left
//   else if (
//     collisionOutLineLeftX > bullet.prevX &&
//     isIntersection(
//       bulletPrevPos,
//       bulletCurPos,
//       { x: collisionOutLineLeftX, y: brickTopY },
//       { x: collisionOutLineLeftX, y: brickBottomY },
//     )
//   ) {
//     //bullet's collision
//     bullet.moveTo({ x: collisionOutLineLeftX });
//     bullet.setDir(substractDeg(180, bullet.dir));
//     //brick's collision
//     brick.attacked(weakness);
//     //user
//     user.score += 10;

//     return true;
//   }
//   //brick's right
//   else if (
//     collisionOutLineRightX < bullet.prevX &&
//     isIntersection(
//       bulletPrevPos,
//       bulletCurPos,
//       { x: collisionOutLineRightX, y: brickTopY },
//       { x: collisionOutLineRightX, y: brickBottomY },
//     )
//   ) {
//     //bullet's collision
//     bullet.moveTo({ x: collisionOutLineRightX });
//     bullet.setDir(substractDeg(180, bullet.dir));
//     //brick's collision
//     brick.attacked(weakness);
//     //user
//     user.score += 10;

//     return true;
//   }
//   // no collision
//   else {
//     return false;
//   }
// }

export default {
  Bullet2Wall,
  Bullet2Brick,
};
