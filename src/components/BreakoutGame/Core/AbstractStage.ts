import options from '../Options';

export type StageState = 'initPos' | 'initDir' | 'updateBullet';

export default abstract class Stage {
  curState: StageState;
  isRunning: boolean;

  constructor() {}

  onPrepared(): void {
    this.curState = 'initPos';
    this.isRunning = false;
  }

  runStage(): void {
    this.isRunning = true;

    switch (this.curState) {
      default:
      case 'initPos':
        this.curState = this.onInitPos();
        break;
      case 'initDir':
        this.curState = this.onInitDir();
        break;
      case 'updateBullet':
        this.curState = this.onUpdateBullet();
        break;
    }
  }

  protected abstract onInitPos(): StageState;
  protected abstract onInitDir(): StageState;
  protected abstract onUpdateBullet(): StageState;

  onStop() {
    this.isRunning = false;
  }

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
