import Stage from './Stage';

import BrickGroup2D from './BrickGroup2D';
import BulletGroup from './BulletGroup';
import User from './User';
import options from './Options';

export default class Game {
  //Game Basic props
  context: CanvasRenderingContext2D;
  requestAnimationFrameId: number;

  // game elements
  stage: Stage;

  constructor() {
    this.init = this.init.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.runGame = this.runGame.bind(this);
    this.exit = this.exit.bind(this);

    this.___runner = this.___runner.bind(this);
    this.___updateData = this.___updateData.bind(this);
    this.___updateView = this.___updateView.bind(this);
  }

  init(context: CanvasRenderingContext2D): void {
    this.context = context;

    this.requestAnimationFrameId = 0;

    this.stage = new Stage(new User(), new BulletGroup(), new BrickGroup2D());
  }

  resetGame(): void {
    this.stage.reset();
  }

  runGame(): void {
    this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
  }

  exit(): void {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  ___runner(): void {
    this.___updateData();
    this.___updateView();

    this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
  }

  ___updateData() {
    this.stage.update();
  }

  ___updateView() {
    const { stageWidth, stageHeight } = options.game.stage;

    this.context.clearRect(0, 0, stageWidth, stageHeight);
    this.stage.draw(this.context);
  }
}
