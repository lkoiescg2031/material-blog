import AbstractStageGame, { GameState } from './AbstractGame';
import Stage from './Stage';

import BulletGroup from '../Objects/BulletGroup';
import User from '../Objects/User';
import BrickGroup from '../Objects/BrickGroup';

export default class Game extends AbstractStageGame {
  // stage
  stage: Stage;

  // object
  user: User;
  bullets: BulletGroup;
  bricks: BrickGroup;

  onCreated(context: CanvasRenderingContext2D): void {
    super.onCreated(context);

    this.user = new User();
    this.bullets = new BulletGroup();
    this.bricks = new BrickGroup();

    this.stage = new Stage(this.user, this.bullets, this.bricks);
  }

  protected onInitialized(t: DOMHighResTimeStamp): GameState {
    //user 초기화
    this.user.setScore(0);
    this.user.setAbility(10, 1); // ballSize, bounce
    // bullets 초기화
    this.bullets.setSize(this.user.ballSize);
    this.bullets.setBounce(this.user.bounce);
    // brick 초기화
    this.bricks.setSize(6, 5); // row, col
    this.bricks.setDurability(0);
    // stage 초기화
    this.stage.setStage(0, 5); // level, try

    return 'ready';
  }

  protected onReady(t: DOMHighResTimeStamp): GameState {
    // TODO 터치 시 다음 화면으로 넘어감
    return 'prepareStage';
  }

  protected onPrepareStage(t: DOMHighResTimeStamp): GameState {
    //사용자 업데이트
    this.user.addAbility(5, 0);
    // bullet 업데이트
    this.bullets.reload();
    this.bullets.setSize(this.user.ballSize);
    this.bullets.setBounce(this.user.bounce);
    //brick 업데이트
    this.bricks.setDurability(this.bricks.durability + 10);
    //stage 업데이트
    this.stage.setStage(this.stage.level + 1, this.stage.tryCount + 5);
    // 스테이지 실행 준비
    this.stage.onPrepared();
    return 'runStage';
  }

  protected onRunStage(t: DOMHighResTimeStamp): GameState {
    this.stage.runStage();

    if (this.stage.tryCount <= 0) {
      this.stage.onStop();
      return 'initialize';
    } else if (this.bricks.getAliveCount() === 0) {
      this.stage.onStop();
      return 'prepareStage';
    } else {
      return 'runStage';
    }
  }

  protected onUpdateView(t: DOMHighResTimeStamp): void {
    super.onUpdateView(t);

    this.stage.draw(this.context);
    this.user.draw(this.context);
    this.bricks.draw(this.context);
    this.bullets.draw(this.context);
  }
}
