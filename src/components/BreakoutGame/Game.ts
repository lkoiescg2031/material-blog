import Stage from './Stage';

import BrickGroup2D from './BrickGroup2D';
import BulletGroup from './BulletGroup';
import User from './User';
import options from './Options';

/**
 * Game 생성 초기화 실행 종료 Class
 */
export default class Game {
  context: CanvasRenderingContext2D;
  requestAnimationFrameId: number;

  // game elements
  stage: Stage;
  user: User;

  constructor() {
    this.reset = this.reset.bind(this); // 초기화
    this.run = this.run.bind(this); // 실행
    this.exit = this.exit.bind(this); // 종료

    this.___initProps = this.___initProps.bind(this);
    this.___resetElements = this.___resetElements.bind(this);
    this.___runner = this.___runner.bind(this);
  }

  reset(context: CanvasRenderingContext2D): void {
    this.___initProps(context); // 진행 기초 요소 초기화 FrameID, context 등
    this.___resetElements(); // 게임 내 객체 초기화
  }

  run(): void {
    this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
  }

  exit(): void {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  ___initProps(context: CanvasRenderingContext2D): void {
    this.context = context;

    this.requestAnimationFrameId = 0;

    this.user = new User(new BulletGroup());
    this.stage = new Stage(this.user, new BrickGroup2D());
  }

  ___resetElements(): void {
    this.user.reset();
    this.stage.reset();
  }

  ___runner(): void {
    const { stageWidth, stageHeight } = options.game.stage;
    this.stage.update();

    this.context.clearRect(0, 0, stageWidth, stageHeight);
    this.stage.draw(this.context);

    this.requestAnimationFrameId = window.requestAnimationFrame(this.___runner);
  }
}
