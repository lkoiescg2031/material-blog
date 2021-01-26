import Wave from './Wave';

export default class WaveGroup {
  //property
  totalWaves: number;
  totalPoints: number;
  waveHeight: (stageHeight: number) => number;
  waveMaxHeight: () => number;
  speed: number;
  colors: string[] | ((ctx: CanvasRenderingContext2D) => CanvasGradient)[];
  waves: Wave[];

  constructor(
    totalWaves = 3,
    totalPoints = 6,
    waveHeight: (stageHeight: number) => number,
    waveMaxHeight: () => number,
    speed: number,
    colors = [
      'rgba(0,199,235,0.4)',
      'rgba(0,146,199,0.4)',
      'rgba(0,87,158,0.4)',
    ],
  ) {
    this.totalWaves = totalWaves;
    this.totalPoints = totalPoints;
    this.colors = colors;
    this.speed = speed;
    this.waveHeight = waveHeight;
    this.waveMaxHeight = waveMaxHeight;

    this.waves = new Array(this.totalWaves)
      .fill(0)
      .map(
        (value, index) =>
          new Wave(
            index,
            this.totalPoints,
            this.waveHeight,
            this.waveMaxHeight,
            this.speed,
            this.colors[index],
          ),
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
