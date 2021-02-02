import Bullet from '../../Objects/Bullet';
import BrickGroup from '../../Objects/BrickGroup';
import User from '../../Objects/User';

import Bullet2Brick from './Bullet2Brick';

export default function Bullet2Bricks(
  bullet: Bullet,
  bricks: BrickGroup,
  user: User,
): boolean {
  for (const rowBricks of bricks.bricks) {
    for (const brick of rowBricks) {
      if (brick.isAlive === false) {
        continue;
      }

      const isCollided = Bullet2Brick(bullet, brick, user);

      if (isCollided === true) {
        return true;
      }
    }
  }
  return false;
}