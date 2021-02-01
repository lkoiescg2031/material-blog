import options from '../Options';

export type GameState = 'initialize' | 'ready' | 'prepareStage' | 'runStage';

export default abstract class AbstractStageGame {
  // Game Basic props
  context: CanvasRenderingContext2D;
  requestAnimationFrameId: number;

  // game elements
  gameState: GameState;

  constructor() {
    this.___runner = this.___runner.bind(this);
  }

  onCreated(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.requestAnimationFrameId = 0;

    this.gameState = 'initialize';
  }

  protected abstract onInitialized(t: DOMHighResTimeStamp): GameState;
  protected abstract onReady(t: DOMHighResTimeStamp): GameState;
  protected abstract onPrepareStage(t: DOMHighResTimeStamp): GameState;
  protected abstract onRunStage(t: DOMHighResTimeStamp): GameState;

  protected onUpdateView(t: DOMHighResTimeStamp): void {
    const { stageWidth, stageHeight } = options.shape.stage;
    this.context.clearRect(0, 0, stageWidth, stageHeight);
  }

  runGame(): void {
    this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
  }

  exit(): void {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  private ___runner(t: DOMHighResTimeStamp): void {
    this.onUpdateData(t);
    this.onUpdateView(t);

    this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
  }

  private onUpdateData(t: DOMHighResTimeStamp): void {
    switch (this.gameState) {
      default:
      case 'initialize':
        this.gameState = this.onInitialized(t);
        return;
      case 'ready':
        this.gameState = this.onReady(t);
        return;
      case 'prepareStage':
        this.gameState = this.onPrepareStage(t);
        return;
      case 'runStage':
        this.gameState = this.onRunStage(t);
        return;
    }
  }
}
