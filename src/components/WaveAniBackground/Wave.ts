import Point from './Point';

export interface WaveProps {
  index?: number;
  totalPoints?: number;
  waveHeight?: (stageHeight: number) => number;
  waveMaxHeight?: () => number;
  speed?: number;
  color?: string | ((ctx: CanvasRenderingContext2D) => CanvasGradient);
}

export default class Wave {
  //property
  index: number;
  totalPoints: number;
  waveHeight: (stageHeight: number) => number;
  waveMaxHeight: () => number;
  speed: number;
  color: string | ((ctx: CanvasRenderingContext2D) => CanvasGradient);
  points: Point[];

  stageWidth: number;
  stageHeight: number;
  centerX: number;
  centerY: number;
  pointGap: number;

  constructor(options: WaveProps = {}) {
    this.index = options.index;
    this.totalPoints = options.totalPoints;
    this.waveHeight = options.waveHeight;
    this.waveMaxHeight = options.waveMaxHeight;
    this.speed = options.speed;
    this.color = options.color;
    this.points = [];

    //for callbacks
    this.resize = this.resize.bind(this);
    this.init = this.init.bind(this);
    this.draw = this.draw.bind(this);
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = this.stageWidth / 2;
    this.centerY = this.stageHeight / 2;

    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    const pointY =
      typeof this.waveHeight === 'function'
        ? this.waveHeight(this.stageHeight)
        : this.centerY;

    this.points = new Array(this.totalPoints)
      .fill(0)
      .map(
        (_, index) =>
          new Point(
            this.index + index,
            this.pointGap * index,
            pointY,
            this.waveMaxHeight,
            this.speed,
          ),
      );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    ctx.fillStyle =
      typeof this.color === 'function' ? this.color(ctx) : this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.totalPoints; i++) {
      const curPoint: Point = this.points[i];

      if (i < this.totalPoints - 1) {
        curPoint.update();
      }

      const cx = (prevX + curPoint.x) / 2;
      const cy = (prevY + curPoint.y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = curPoint.x;
      prevY = curPoint.y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, 0);
    ctx.lineTo(this.points[0].x, 0);
    ctx.fill();
    ctx.closePath();

    ctx.fill();
  }
}
