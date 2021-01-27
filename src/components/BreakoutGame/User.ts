export default class User {
  score: number;
  maxScore: number;
  totalBall: number;
  durability: number;
  tryCount: number;

  constructor() {
    this.score = 0;
    this.maxScore = 0;
    this.totalBall = 1;
    this.durability = 10;
    this.tryCount = 10;
  }

  reset() {
    this.score = 0;
    this.maxScore = 0;
    this.totalBall = 1;
    this.durability = 10;
    this.tryCount = 10;
  }
  
  update() {}

  draw(ctx: RenderingContext) {}
}
