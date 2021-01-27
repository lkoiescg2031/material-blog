import Stage from './Stage';
import Bullet from './Bullet';
import BrickGroup2D from './BrickGroup2D';

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
    this.bricks = new BrickGroup2D(
      this.stageWidth, // stage width
      6, //row count
      5, //col count
      18, // brick height
      18, // brick space
      1000, //brick durability
      ['#6E6E6D', '#FAD0C9'], //brick color
      '14px pixel-retro', // brick font
    );
  }

  ___createElements(): void {
    this.bullets = [
      new Bullet(
        10, //x
        500, //y
        3, //r
        'yellow', //color
        350, //dir; deg
        2, //speed
      ),
    ];
    this.bricks.reset();
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
