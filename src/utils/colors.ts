export function addAlpha(color: string, opacity = 1) {
  const ___opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
  const rgbLength = color[0] === '#' ? 7 : 6;
  return (
    color.substring(0, rgbLength) +
    ___opacity.toString(16).padStart(2, '0').toUpperCase()
  );
}
