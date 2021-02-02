import options from '../../Options';

// objects
import User from '../../Objects/User';
import Bullet from '../../Objects/Bullet';

// math
import Vector2D from '../../util/Math/Vector2D';
import {
  isPointInBox,
  segmentIntersectsWithPoint,
} from '../../util/Math/Geometry';

//FIXME 모서리에서 충돌 처리되지 않는 현상
export default function Bullet2Wall(bullet: Bullet, user: User): boolean {
  //Game 외형 옵션
  const { radius } = options.shape.bullet;
  const { scoreBoardHeight: y } = options.shape.stage;
  const { stageWidth, stageHeight } = options.shape.stage;

  const perPoint = 1;
  const damage = 1;

  //스테이지 내부 선
  const stageLeftX = radius;
  const stageRightX = stageWidth - radius;
  const stageTopY = y + radius;
  const stageBottomY = stageHeight - radius;

  const topLeft = new Vector2D(stageLeftX, stageTopY);
  const topRight = new Vector2D(stageRightX, stageTopY);
  const botLeft = new Vector2D(stageLeftX, stageBottomY);
  const botRight = new Vector2D(stageRightX, stageBottomY);

  //총알
  const prevPos = bullet.prevPos.clone();
  const curPos = bullet.curPos.clone();

  const isCrossing = (a: Vector2D, b: Vector2D) =>
    segmentIntersectsWithPoint(a, b, prevPos, curPos);

  //이전 위치가 경계선 밖인 경우 (경계선 포함)
  if (!isPointInBox(prevPos, topLeft, botRight)) {
    return false;
  }

  //왼쪽 벽 충돌
  const leftCrossing = isCrossing(topLeft, botLeft);
  if (leftCrossing.isIntersect) {
    // 총알 충돌 처리
    bullet.setPos(leftCrossing.point.x, leftCrossing.point.y);
    bullet.setMove(bullet.move.x * -1, bullet.move.y);
    // 유저 점수 획득
    user.setScore(user.score + perPoint);
    return true;
  }

  //오른쪽 벽 충돌
  const rightCrossing = isCrossing(topRight, botRight);
  if (rightCrossing.isIntersect) {
    // 총알 방향 전환
    bullet.setPos(rightCrossing.point.x, rightCrossing.point.y);
    bullet.setMove(bullet.move.x * -1, bullet.move.y);
    // 유저 점수 증가
    user.setScore(user.score + perPoint);
    return true;
  }

  // 상단 벽 충돌
  const topCrossing = isCrossing(topLeft, topRight);
  if (topCrossing.isIntersect) {
    // 총알 충돌 처리
    bullet.setPos(topCrossing.point.x, topCrossing.point.y);
    bullet.setMove(bullet.move.x, bullet.move.y * -1);
    // 유저 점수 증가
    user.setScore(user.score + perPoint);
    return true;
  }

  //하단 벽 충돌
  const botCrossing = isCrossing(botLeft, botRight);
  if (botCrossing.isIntersect) {
    // 총알 충돌 처리
    bullet.setPos(botCrossing.point.x, botCrossing.point.y);
    bullet.setMove(bullet.move.x, bullet.move.y * -1);
    bullet.attacked(damage); //바운스 횟수 감소
    // 유저 점수 증가
    user.setScore(user.score + perPoint);
    return true;
  }

  // 그 외
  return false;
}
