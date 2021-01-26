export default class Point {
  x: number;
  y: number;
  fixY: number;

  cur: number;
  speed: number;
  maxMove: number;

  constructor(
    index: number,
    x: number,
    y: number,
    maxMove: () => number,
    speed: number,
  ) {
    this.x = x;
    this.y = y;
    this.fixY = y;

    this.cur = index;
    this.speed = speed;
    this.maxMove = maxMove();

    //for callback
    this.update = this.update.bind(this);
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixY + Math.sin(this.cur) * this.maxMove;
  }
}
