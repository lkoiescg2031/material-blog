import options from './Options';

export default class User {
  // about game
  score: number;
  maxScore: number;

  // ability
  totalBall: number;
  durability: number;
  totalBallIncRate: number;
  durablityIncRate: number;

  //shootInfo
  posX: number;
  dir: number;

  constructor() {
    this.reset = this.reset.bind(this);
    this.levelUpdate = this.levelUpdate.bind(this);
    this.draw = this.draw.bind(this);

    this.maxScore = 0;
    this.score = 0;
  }

  reset() {
    const {
      bulletCount,
      bulletDurability,
      bulletCountIncRate,
      bulletDurabilityIncRate,
    } = options.game.user;

    this.maxScore = Math.max(this.maxScore, this.score);
    this.score = 0;

    this.totalBall = bulletCount - bulletCountIncRate;
    this.durability = bulletDurability - bulletDurabilityIncRate;
    this.totalBallIncRate = bulletCountIncRate;
    this.durablityIncRate = bulletDurabilityIncRate;

    this.posX = 0;
    this.dir = 180;
  }

  levelUpdate() {
    this.totalBall += this.totalBallIncRate;
    this.durability += this.durablityIncRate;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { y, stageWidth } = options.game.stage;
    const { fontSmall, fontBig, fontColor } = options.game.user;
    const maxTextWidth = stageWidth / 3 - 10;

    const scorePad = 9;
    const maxScoreStr = this.maxScore.toString().padStart(scorePad, '0');
    const scoreStr = this.score.toString().padStart(scorePad, '0');

    //draw bounce
    ctx.beginPath();
    ctx.font = fontSmall;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`balls ${this.totalBall}`, 8, y / 2 - 3, maxTextWidth);
    ctx.closePath();

    //draw ballCounts
    ctx.beginPath();
    ctx.font = fontBig;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`bounce ${this.durability}`, 8, y - 8, maxTextWidth);
    ctx.closePath();

    //max score
    ctx.beginPath();
    ctx.font = fontSmall;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${maxScoreStr}`, stageWidth - 8, y / 2 - 3, maxTextWidth);
    ctx.closePath();

    //max score
    ctx.beginPath();
    ctx.font = fontBig;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`${scoreStr}`, stageWidth - 8, y - 8, maxTextWidth);
    ctx.closePath();
  }
}
