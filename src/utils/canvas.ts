export const createGradient = gradientOptions => ctx => {
  const { height } = ctx.canvas;
  const canvasGradient = ctx.createLinearGradient(0, 0, 0, height);

  Object.entries(gradientOptions).forEach(([offset, color]) => {
    canvasGradient.addColorStop(offset, color);
  });

  return canvasGradient;
};
