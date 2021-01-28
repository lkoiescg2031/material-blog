import BulletGroup from './BulletGroup';

export default class User {
  // element
  bullets: BulletGroup;

  // about game
  score: number;
  maxScore: number;
  // ability
  totalBall: number;
  durability: number;

  constructor(bullets: BulletGroup) {
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.score = 0;
    this.maxScore = 0;
    this.totalBall = 1;
    this.durability = 10;
    this.bullets = bullets;
  }

  reset() {
    this.score = 0;
    this.maxScore = 0;
    this.totalBall = 1;
    this.durability = 10;

    this.bullets.reset();
  }

  update() {}

  draw(ctx: RenderingContext) {}
}
