export default interface Drawable {
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}
