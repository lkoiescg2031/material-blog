import Stage from './Stage';

import { GameState } from './GameState';
import BrickGroup2D from './BrickGroup2D';
import BulletGroup from './BulletGroup';
import User from './User';
import options from './Options';

export default class Game {
  // Game Basic props
  context: CanvasRenderingContext2D;
  requestAnimationFrameId: number;

  // game elements
  gameState: GameState;
  stage: Stage;

  constructor() {
    this.init = this.init.bind(this);
    this.runGame = this.runGame.bind(this);
    this.exit = this.exit.bind(this);

    this.___runner = this.___runner.bind(this);
    this.___updateData = this.___updateData.bind(this);
    this.___updateView = this.___updateView.bind(this);
  }

  init(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.requestAnimationFrameId = 0;

    this.gameState = 'initialize';
    this.stage = new Stage(new User(), new BulletGroup(), new BrickGroup2D());
  }

  runGame(): void {
    this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
  }

  exit(): void {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  private ___runner(t: DOMHighResTimeStamp): void {
    this.___updateData(t);
    this.___updateView(t);

    this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
  }

  private ___updateData(t: DOMHighResTimeStamp): void {
    switch (this.gameState) {
      default:
      case 'initialize':
        this.gameState = this.stage.initialize();
        return;
      case 'ready':
        this.gameState = this.stage.ready();
        return;
      case 'prepareStage':
        this.gameState = this.stage.prepareStage();
        return;
      case 'runStage':
        this.gameState = this.stage.runStage();
        return;
    }
  }

  private ___updateView(t: DOMHighResTimeStamp) {
    const { stageWidth, stageHeight } = options.game.stage;
    // 이전 화면 클리어
    this.context.clearRect(0, 0, stageWidth, stageHeight);

    this.stage.draw(this.context);
  }
}
