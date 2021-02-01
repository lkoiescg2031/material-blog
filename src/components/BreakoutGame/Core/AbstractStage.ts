import options from '../Options';

export type StageState = 'initPos' | 'initDir' | 'updateBullet';

export default abstract class Stage {
  stageState: StageState;

  constructor() {}

  protected onInitialized(): void {
    this.stageState = 'initPos';
  }

  runStage(): void {
    switch (this.stageState) {
      default:
      case 'initPos':
        this.stageState = this.onInitPos();
        break;
      case 'initDir':
        this.stageState = this.onInitDir();
        break;
      case 'updateBullet':
        this.stageState = this.onUpdateBullet();
        break;
    }
  }

  protected abstract onInitPos(): StageState;
  protected abstract onInitDir(): StageState;
  protected abstract onUpdateBullet(): StageState;

  draw(ctx: CanvasRenderingContext2D): void {
    const { stage } = options.shape;
    const { scoreBoardHeight: y, stageWidth, stageHeight } = stage;
    const { stageColor, outLineWidth } = stage;

    // outter line
    ctx.beginPath();
    ctx.strokeStyle = stageColor;
    ctx.lineWidth = outLineWidth;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, stageHeight);
    ctx.lineTo(stageWidth, stageHeight);
    ctx.lineTo(stageWidth, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.closePath();

    // interface board
    ctx.beginPath();
    ctx.fillStyle = stageColor;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, y);
    ctx.lineTo(stageWidth, y);
    ctx.lineTo(stageWidth, 0);
    ctx.fill();
    ctx.closePath();
  }
}
