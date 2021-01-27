import Stage from './Stage';
import Bullet from './Bullet';
import Brick from './Brick';

export default class Game {
  stageWidth: number;
  stageHeight: number;
  context: CanvasRenderingContext2D;
  requestAnimationFrameId: number;

  // game elements
  stage: Stage;

  //user elements
  bullets: Bullet[];

  //enemy elements
  bricks: Brick[];

  constructor() {
    this.reset = this.reset.bind(this);
    this.run = this.run.bind(this);
    this.exit = this.exit.bind(this);

    this.___initProps = this.___initProps.bind(this);
    this.___createElements = this.___createElements.bind(this);
    this.___createStage = this.___createStage.bind(this);
    this.___animate = this.___animate.bind(this);
  }

  reset(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ): void {
    this.___initProps(context, width, height);
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

  ___initProps(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ): void {
    this.stageWidth = width;
    this.stageHeight = height;
    this.context = context;

    this.requestAnimationFrameId = 0;
    this.bullets = [];
    this.bricks = [];
  }

  ___createElements(): void {
    this.bullets = [new Bullet()];
    this.bricks = [new Brick()];
  }

  ___createStage(): void {
    this.stage = new Stage(
      this.stageWidth,
      this.stageHeight,
      this.bullets,
      this.bricks,
    );
  }

  ___animate(): void {
    this.stage.update();

    this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.context.strokeRect(0, 0, this.stageWidth, this.stageHeight);

    this.stage.draw(this.context);

    this.requestAnimationFrameId = window.requestAnimationFrame(
      this.___animate,
    );
  }
}
