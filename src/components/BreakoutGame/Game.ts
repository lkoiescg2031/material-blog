import Stage from './Stage';

import BrickGroup2D from './BrickGroup2D';
import BulletGroup from './BulletGroup';
import User from './User';
import options from './Options';

export default class Game {
  context: CanvasRenderingContext2D;
  requestAnimationFrameId: number;

  // game elements
  stage: Stage;

  //user elements
  user: User;
  bullets: BulletGroup;

  //enemy elements
  bricks: BrickGroup2D;

  constructor() {
    this.reset = this.reset.bind(this);
    this.run = this.run.bind(this);
    this.exit = this.exit.bind(this);

    this.___initProps = this.___initProps.bind(this);
    this.___createElements = this.___createElements.bind(this);
    this.___createStage = this.___createStage.bind(this);
    this.___animate = this.___animate.bind(this);
  }

  reset(context: CanvasRenderingContext2D): void {
    this.___initProps(context);
    this.___createElements();
    this.___createStage();
  }

  run(): void {
    this.requestAnimationFrameId = window.requestAnimationFrame(
      this.___animate,
    );
  }

  exit(): void {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  ___initProps(context: CanvasRenderingContext2D): void {
    this.context = context;

    this.requestAnimationFrameId = 0;

    this.user = new User();
    this.bullets = new BulletGroup(
      1000, // total bullet counts
      10, //x
      500, //y
      290, //dir; deg
      10, //durability
    );
    this.bricks = new BrickGroup2D(
      6, //row count
      5, //col count
      1000, //durability
    );
  }

  ___createElements(): void {
    this.user.reset();
    this.bullets.reset();
    this.bricks.reset();
  }

  ___createStage(): void {
    this.stage = new Stage(this.user, this.bullets, this.bricks);
  }

  ___animate(): void {
    const { stageWidth, stageHeight } = options.game.stage;
    this.stage.update();

    this.context.clearRect(0, 0, stageWidth, stageHeight);
    this.stage.draw(this.context);

    this.requestAnimationFrameId = window.requestAnimationFrame(
      this.___animate,
    );
  }
}
