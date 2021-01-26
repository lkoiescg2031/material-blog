import Wave from './Wave';

export interface WaveGroupOptions {
  totalWaves?: number;
  totalPoints?: number;
  waveHeight?: (stageHeight: number) => number;
  waveMaxHeight?: () => number;
  speed?: number;
  colors?: string[] | ((ctx: CanvasRenderingContext2D) => CanvasGradient)[];
  waves?: Wave[];
}

export default class WaveGroup {
  //property
  totalWaves: number;
  totalPoints: number;
  waveHeight: (stageHeight: number) => number;
  waveMaxHeight: () => number;
  speed: number;
  colors: string[] | ((ctx: CanvasRenderingContext2D) => CanvasGradient)[];
  waves: Wave[];

  constructor(options: WaveGroupOptions = {}) {
    this.totalWaves = options.totalWaves || 3;
    this.totalPoints = options.totalPoints || 6;
    this.colors = options.colors || [
      'rgba(0,199,235,0.4)',
      'rgba(0,146,199,0.4)',
      'rgba(0,87,158,0.4)',
    ];
    this.speed = options.speed || 0.1;
    this.waveHeight = options.waveHeight || (stageHeight => stageHeight / 2);
    this.waveMaxHeight =
      options.waveMaxHeight || (() => Math.random() * 100 + 150);

    this.waves = new Array(this.totalWaves).fill(0).map(
      (_, index) =>
        new Wave({
          index,
          totalPoints: this.totalPoints,
          waveHeight: this.waveHeight,
          waveMaxHeight: this.waveMaxHeight,
          speed: this.speed,
          color: this.colors[index],
        }),
    );

    //for callbacks
    this.resize = this.resize.bind(this);
    this.draw = this.draw.bind(this);
  }

  resize(stageWidth: number, stageHeight: number) {
    this.waves.forEach(wave => wave.resize(stageWidth, stageHeight));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.waves.forEach(wave => wave.draw(ctx));
  }
}
