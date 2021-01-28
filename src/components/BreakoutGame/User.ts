import BulletGroup from './BulletGroup';
import options from './Options';

export default class User {
  // about game
  score: number;
  maxScore: number;

  // ability
  totalBall: number;
  durability: number;

  constructor() {
    this.reset = this.reset.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.reset();
  }

  reset() {
    this.score = 0;
    this.maxScore = 0;
    this.totalBall = 1000;
    this.durability = 10;
  }

  update() {
    //TODO bolls 와 bounce 증가
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
